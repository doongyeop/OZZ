import json
import logging
import os
import traceback
import time
from io import BytesIO

import pika
from pika import exceptions
import requests
from requests_toolbelt import MultipartEncoder

from app.core.client.ExtractAttribute import ExtractAttributesURL
from app.schemas.attributes import NormalizedClothes, ImageMetadata
from app.utils.image_process import process_url
from app.utils.image_utils import resize_and_convert_to_png


def parseToBaseModel(body) -> list[NormalizedClothes] | None:
    try:
        data: list[dict] = json.loads(body)
        return list(map(lambda a: NormalizedClothes(**a), data))
    except Exception as e:
        logging.error(traceback.format_exc())

    return None


def EAcallback(ch, method, properties, body):
    raw_data = parseToBaseModel(body)
    if not raw_data:
        return
    logging.info(f"속성 추출 :  {raw_data}")

    key_to_imgurl={a.clothId:a.imgUrl for a in raw_data}

    data=None
    removed_data=[]
    try:
        client = ExtractAttributesURL(raw_data)
        data,removed_data = client.get_result()
    except Exception as e:
        logging.error(traceback.format_exc())

    try:
        if len(removed_data) > 0:
            try:
                logging.info(f"속성 추출 실패한 옷 삭제 : {str(removed_data)}")
                removed_data=list(map(int,removed_data))
                url = f"{os.getenv('CLOTHES_ENDPOINT')}/api/clothes"
                requests.delete(url, json=removed_data)
            except Exception as e:
                logging.error(f"속성 추출 실패한 옷 삭제에러: {str(removed_data)}")
        
        for key in data.keys():
            # 엔드포인트 URL 및 clothesId 설정
            url = f"{os.getenv('CLOTHES_ENDPOINT')}/api/clothes/{key}"
            # 요청 헤더 및 파일 설정
            logging.info(f"속성 등록 :  {url}")
            attr_data = data[key].model_dump()
            attr_data["processing"] = -2
            # PUT 요청 보내기
            mp_encoder = MultipartEncoder(
                fields={
                    "request": ('request', json.dumps(attr_data), 'application/json')
                }
            )
            # PUT 요청 보내기
            response = requests.put(url, data=mp_encoder, headers={"Content-Type": mp_encoder.content_type})

            image_metadata={
                "clothId": key,
                "categoryLowId": attr_data["categoryLowId"],
                "imgUrl": key_to_imgurl[key],
                "isOnlyItem": attr_data["isOnlyItem"],
            }
            ch.basic_publish(exchange='', routing_key="image-process", body=json.dumps(image_metadata))

            # 응답 출력
            logging.info(response)
    except Exception as e:
        logging.error(e)


def IPcallback(ch, method, properties, body):
    data: ImageMetadata = ImageMetadata(**json.loads(body))

    if not data:
        return
    logging.info(f"이미지 처리 :  {str(data)}")

    try:
        processed_image = process_url(data)
        #이미지 크기 및 확장자 정규화
        processed_image = resize_and_convert_to_png(processed_image)
        # BytesIO 객체에 이미지 저장
        image_byte_array = BytesIO()
        processed_image.save(image_byte_array, format='PNG')
        image_byte_array.seek(0)

        # 엔드포인트 URL 및 clothesId 설정
        url = f"{os.getenv('CLOTHES_ENDPOINT')}/api/clothes/{data.clothId}/image"

        mp_encoder = MultipartEncoder(
            fields={
                "imageFile": (f'{data.clothId}.png', image_byte_array, "image/png")
            }
        )

        logging.info(f"이미지 등록 :  {url}")

        # patch 요청 보내기
        response = requests.patch(url, data=mp_encoder, headers={"Content-Type": mp_encoder.content_type})

        # 응답 출력
        logging.info(response)
    except Exception as e:
        logging.error(traceback.format_exc())


def connect_to_rabbitmq():
    retry_count = 12
    parameters = pika.ConnectionParameters(os.getenv("RABBITMQ_HOST"))  # RabbitMQ 서버의 주소
    while retry_count > 0:
        try:
            connection = pika.BlockingConnection(parameters)
            channel = connection.channel()
            return connection, channel
        except exceptions.AMQPConnectionError as e:
            logging.error(f"Connection failed, retrying in 5 seconds: {e}")
            retry_count -= 1
            time.sleep(5)
        except Exception as e:
            logging.error(f"Connection failed, 알수없는 오류 {e}")
            retry_count -= 12
    return None, None


def consume_messages(channel):
    channel.queue_declare(queue='extract-attribute')
    channel.queue_declare(queue='image-process')
    channel.basic_consume(queue='extract-attribute',
                          on_message_callback=EAcallback,
                          auto_ack=True)
    channel.basic_consume(queue='image-process',
                          on_message_callback=IPcallback,
                          auto_ack=True)
    try:
        channel.start_consuming()
    except pika.exceptions.StreamLostError:
        print("Stream lost, attempting to reconnect...")
        return False  # 연결이 끊겼음을 알림


def main():
    while True:
        connection, channel = connect_to_rabbitmq()
        if connection is None:
            logging.error("RabbitMQ connection failed")
            return
        if not consume_messages(channel):
            continue


if __name__ == "__main__":
    main()
