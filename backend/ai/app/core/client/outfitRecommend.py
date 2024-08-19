import json
import logging

from pydantic import BaseModel

from app.core.client.openAIClient import OpenAIClient
from app.schemas.recommend import Recommend

from enum import Enum
from typing import Optional

class Style(Enum):
    ROMANTIC = "ROMANTIC"
    STREET = "STREET"
    SPORTY = "SPORTY"
    NATURAL = "NATURAL"
    MASCULINE = "MASCULINE"
    CASUAL = "CASUAL"
    ELEGANT = "ELEGANT"
    MODERN = "MODERN"
    FORMAL = "FORMAL"
    ETHNIC = "ETHNIC"


class RecommendedOutfit(BaseModel):
    title: str
    items: list[int]
    recommendation_reason: str
    style: Style


class ChatGPTOutfitRecommendation(BaseModel):
    result: str
    outfit: Optional[list[RecommendedOutfit]]


class OutfitRecommendationV2(OpenAIClient):
    recommend: Recommend
    system_prompt = """
Role:
You are a professional AI that recommends outfit based on the clothes in my closet.
It provides recommendations by comprehensively analyzing the current weather and the characteristics of the clothes.

Considerations:
- Clothing characteristics: <cloth_id> is the id of the corresponding clothes.
- weather: weather and average temperature
- pointColor: point color of the clothes that should be included
- essential: clothes that should be included
- style: desired outfit styles
- category: <parentCategory> of items that make up the clothes should not overlap. In other words, the outfit do not select two clothes within the same <parentCategory>.

Example request:
{
"clothes":{
<parentCategory>:[{
"id": <clothe_id>,
<AttributeName>: <AttributeValues>,
"subCategory": "Shirts"}]
}
},
"consider":{
"weather":{"temperature":25,"weather": "rain"}
"pointColor":["RED","WHITE"],
"essential":[<clothe_id>],
"style": ["FORMAL","CASUAL"]
}
}

Result:
Reports recommended outfit in JSON format, including a simple title, the ID of the composed clothing, and a <recommendation_reason> for the recommendation. <possibleValues>Categorize the style of the recommended clothing
Recommend up to 10 outfit, and if you can't make a outfit that meets the criteria, write the reason why you can't make it in `result`.
If you created an outfit, `result` is "success" and write the outfit information you created in `outfit` as in the Example result.
"""

    def __init__(self, recommend: Recommend):
        super().__init__()
        self.recommend = recommend

    def get_response(self):
        response = self.client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            response_format=ChatGPTOutfitRecommendation,
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": self.system_prompt
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": self.make_user_content()
                },
            ],
            temperature=1,
            max_tokens=4000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return response.choices[0].message.parsed

    def parse_response(self, response: dict):
        if response.result == "success":
            return response.outfit
        else:
            logging.info("추천 복장 없음, 이유: " + response.result)
            return []

    def get_result(self):
        return self.parse_response(self.get_response())

    def make_user_content(self):
        data_format = {key: [] for key in self.clothes_metadata.category_dict().keys()}
        clothes = self.recommend.clothes
        for clothe in clothes:
            data_format[clothe.parentCategory].append(clothe.model_dump(exclude={"imgPath", "parentCategory"}))
        content = {
            "clothes": data_format,
            "consider": self.recommend.consider.model_dump()
        }
        print(json.dumps(content,ensure_ascii=False))
        return [
            {
                "type": "text",
                "text": json.dumps(content,ensure_ascii=False)
            }
        ]



class OutfitRecommendation(OpenAIClient):
    recommend: Recommend
    system_prompt = """
Role:
You are a professional AI that recommends outfit based on the clothes in my closet.
It provides recommendations by comprehensively analyzing the current weather and the characteristics of the clothes.

Considerations:
- Clothing characteristics: <cloth_id> is the id of the corresponding clothes.
- weather: weather and average temperature
- pointColor: point color of the clothes that should be included
- essential: clothes that should be included
- style: desired outfit styles
- category: <parentCategory> of items that make up the clothes should not overlap. In other words, the outfit do not select two clothes within the same <parentCategory>.

Example request:
{
"clothes":{
<parentCategory>:[{
"id": <clothe_id>,
<AttributeName>: <AttributeValues>,
"subCategory": "Shirts"}]
}
},
"consider":{
"weather":{"temperature":25,"weather": "rain"}
"pointColor":["RED","WHITE"],
"essential":[<clothe_id>],
"style": ["FORMAL","CASUAL"]
}
}

Result:
Reports recommended outfit in JSON format, including a simple title, the ID of the composed clothing, and a <recommendation_reason> for the recommendation. <possibleValues>Categorize the style of the recommended clothing
<possibleValues>ROMANTIC, STREET, SPORTY, NATURAL, MASCULINE, CASUAL, ELEGANT, MODERN, FORMAL, ETHNIC</possibleValues>
Recommend up to 10 outfit, and if you can't make a outfit that meets the criteria, write the reason why you can't make it in `result`.
If you created an outfit, `result` is "success" and write the outfit information you created in `outfit` as in the Example result.

Example result:
{
"result":"success"
"outfit":[{
"title": "Fall Casual Look",
"items": ["12","54","23","56","2352"],
"style": "FORMAL",
"recommendation_reason": <recommendation_reason>}]
}
"""

    def __init__(self, recommend: Recommend):
        super().__init__()
        self.recommend = recommend

    def get_response(self):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": self.system_prompt
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": self.make_user_content()
                },
            ],
            temperature=1,
            max_tokens=4000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return json.loads(response.choices[0].message.content)

    def parse_response(self, response: dict):
        if response["result"] == "success":
            return list(map(lambda a: RecommendedOutfit(**a), response["outfit"]))
        else:
            logging.info("추천 복장 없음, 이유: " + response["result"])
            return []

    def get_result(self):
        return self.parse_response(self.get_response())

    def make_user_content(self):
        data_format = {key: [] for key in self.clothes_metadata.category_dict().keys()}
        clothes = self.recommend.clothes
        for clothe in clothes:
            data_format[clothe.parentCategory].append(clothe.model_dump(exclude={"imgPath", "parentCategory"}))
        content = {
            "clothes": data_format,
            "consider": self.recommend.consider.model_dump()
        }
        return [
            {
                "type": "text",
                "text": json.dumps(content)
            }
        ]
