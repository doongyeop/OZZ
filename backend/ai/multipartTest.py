from requests_toolbelt.multipart.encoder import MultipartEncoder
import requests
# 엔드포인트 URL 및 clothesId 설정
url = 'http://localhost:8081/api/clothes/49'
# 요청 헤더 및 파일 설정
mp_encoder = MultipartEncoder(
    fields={
        "request": ('request','{"fit":"REGULAR_FIT","colorList":["BLACK"],"patternList":["GRAPHIC"],"seasonList":["SPRING","SUMMER","AUTUMN"],"styleList":["CASUAL"],"textureList":["COTTON"],"extra":"short, sleeves","categoryLowId":3}','application/json')
    }
)
# PUT 요청 보내기
response = requests.put(url, data=mp_encoder, headers={"Content-Type": mp_encoder.content_type})

# 응답 출력
print(str(response.request.body))