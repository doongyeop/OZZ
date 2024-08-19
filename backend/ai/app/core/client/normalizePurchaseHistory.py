import json
import logging
import re
import uuid

from app.core.client.openAIClient import OpenAIClient
from app.schemas.purchaseHistory import PurchaseHistory


class NormalizePurchaseHistory(OpenAIClient):
    buffer = ""
    system_prompt = """
Your role: 
I will give you a <purchase history>. The <purchase history> consists of the product name and product options. 
Distinguish the category, color of this product with the product name and product options. 
 
Examples of <purchase history>: 
{"name": "8부 데님 버뮤다팬츠 - 3COLOR", "option": "1번(S) : 라이트블루"}
{"name": "shawl mood knit (5colors)", "option": "바이올렛, 선택없음"}
{"name": "오데일리 접이식 속옷 정리함 12칸 손잡이형 2개", "option": "화이트, free"} 
 
Result: 
Please give me the order of the given purchase history in JSON format. 
- Category: If it cannot be expressed as a value corresponding to the <Possible values>, it is not a fashion item, so return "None". 
<Possible values>top, bottom, outerwear, dress, shoes, bag, accessory<Possible values> 
- name: If the product name includes color or size, please exclude it. 
- color: Provide only if it is a fashion item. If color exists in both the name and the option, prioritize the option. 
 
Result format: 
Purchase history is grouped into one <index> for every 10 purchase histories.
Purchase history with 10 or fewer remaining purchases is grouped into one <index>.
The <index> of a purchase history group starts at 0 and increases by 1 (e.g. 0,1,2,...)
 
Example results: 
{ 
"<index>":{ 
{"category":"bottom", "name":"8부 데님 버뮤다팬츠", "color":"라이트블루"}, 
{"category":"top", "name":"shawl mood knit", "color":"바이올렛"}, 
{"category":"None", "name":"오데일리 접이식 속옷 정리함 12칸 손잡이형 2개"}} 
}
"""
    purchase_histories: list[PurchaseHistory]

    def __init__(self, purchase_histories: list[PurchaseHistory]):
        super().__init__()
        self.purchase_histories = purchase_histories

    def make_user_prompt(self):
        return {
            "type": "text",
            "text": "\n".join(map(lambda history: history.model_dump_json(), self.purchase_histories))
        }

    def get_stream(self):
        stream = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "Your role: \nI will give you a <purchase history>. The <purchase history> consists of the product name and product options. \nDistinguish the category, color of this product with the product name and product options. \n \nExamples of <purchase history>: \n{\"name\": \"8부 데님 버뮤다팬츠 - 3COLOR\", \"option\": \"1번(S) : 라이트블루\"}\n{\"name\": \"shawl mood knit (5colors)\", \"option\": \"바이올렛, 선택없음\"}\n{\"name\": \"오데일리 접이식 속옷 정리함 12칸 손잡이형 2개\", \"option\": \"화이트, free\"} \n \nResult: \nPlease give me the order of the given purchase history in JSON format. \n- Category: If it cannot be expressed as a value corresponding to the <Possible values>, it is not a fashion item, so return \"None\". \n<Possible values>top, bottom, outerwear, dress, shoes, bag, accessory<Possible values> \n- name: If the product name includes color or size, please exclude it. \n- color: Provide only if it is a fashion item. If color exists in both the name and the option, prioritize the option. \n \nResult format: \nPurchase history is grouped into one <index> for every 10 purchase histories.\nPurchase history with 10 or fewer remaining purchases is grouped into one <index>.\nThe <index> of a purchase history group starts at 0 and increases by 1 (e.g. 0,1,2,...)\n \nExample results: \n{ \n\"<index>\":{ \n{\"category\":\"bottom\", \"name\":\"8부 데님 버뮤다팬츠\", \"color\":\"라이트블루\"}, \n{\"category\":\"top\", \"name\":\"shawl mood knit\", \"color\":\"바이올렛\"}, \n{\"category\":\"None\", \"name\":\"오데일리 접이식 속옷 정리함 12칸 손잡이형 2개\"}} \n}"
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        self.make_user_prompt()
                    ]
                }
            ],
            temperature=0,
            max_tokens=50 * len(self.purchase_histories),
            top_p=0.9,
            frequency_penalty=0,
            presence_penalty=0,
            stream=True,
            response_format={"type": "json_object"},
        )
        return stream

    def parse_stream_data(self, data):
        parsed_dict = {}
        pattern = r'"(\d+)": (\[\s*\{.*?\}\s*\])'
        match = re.search(pattern, data, re.DOTALL)
        if not match:
            return None, data

        key = match.group(1)  # <숫자> 부분
        value = match.group(2)  # [<내용>] 부분

        # JSON 형식으로 파싱
        value_list = json.loads(value)

        # 값 검증
        for item in value_list:
            for k, v in item.items():
                if v == "None":
                    item[k] = None

        # 딕셔너리에 추가
        parsed_dict["index"] = int(key)
        parsed_dict["data"] = value_list

        # 매칭된 부분 제거
        data = data[:match.start()] + data[match.end():]

        return parsed_dict, data

    def get_response(self):
        stream = self.get_stream()
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                self.buffer += chunk.choices[0].delta.content
                parsed_result, self.buffer = self.parse_stream_data(self.buffer)

                if parsed_result:
                    logging.info("purchase history normalized -> " + str(parsed_result))
                    yield {
                        "event": "test",
                        "id": str(uuid.uuid4()),
                        "data": json.dumps(parsed_result, ensure_ascii=False)
                    }
