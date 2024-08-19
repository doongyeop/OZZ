import json
import logging
from typing import Any

from app.core.client.openAIClient import OpenAIClient
from app.core.client.validateAttribute import run_validate
from app.schemas.attributes import NormalizedClothes, Attributes, GPTAttrResponse


class ExtractAttribute(OpenAIClient):
    system_prompt: str = """
your role:
You are an AI expert in clothing analysis. Analyze photos of items and identify them based on the following attributes.

Request Format:
<clothes><order></order><type></type><color></color></clothes>
The values wrapped in <order> are the order of the clothing photos.
The information wrapped in <color> is an color that has already been identified for each garment.

Attributes:
1. <fit>
<Constraint>Type to how clothes fit body. Single value. `null` if there is no possible matching value.</Constraint>
<possibleValues>OVER_FIT, SEMI_OVER_FIT, REGULAR_FIT, SLIM_FIT</possibleValues>
</fit>
2. <colorList>
<Constraint>Identify up to 3 primary colors, Multiple values. Essential value</Constraint>
<possibleValues>WHITE, BLACK, GRAY, RED, PINK, ORANGE, BEIGE, YELLOW, BROWN, GREEN, KHAKI, MINT, BLUE, NAVY, SKY, PURPLE, LAVENDER, WINE, NEON, GOLD</possibleValues>
</colorList>
3. <patternList>
<Constraint>Multiple values. `null` if there is no possible matching value</Constraint>
<possibleValues>SOLID, STRIPED, ZIGZAG, LEOPARD, ZEBRA, ARGYLE, DOT, PAISLEY, CAMOUFLAGE, FLORAL, LETTERING, GRAPHIC, SKULL, TIE_DYE, GINGHAM, GRADATION, CHECK, HOUNDSTOOTH</possibleValues>
</patternList>
4. <seasonList>
<Constraint>Suitable season to wear. Multiple values. `null` if there is no possible matching value</Constraint>
<possibleValues>SPRING, SUMMER, AUTUMN, WINTER</possibleValues>
</seasonList>
5. <styleList>
<Constraint>Unique appearance or atmosphere. Multiple values. `null` if there is no possible matching value</Constraint>
<possibleValues>ROMANTIC, STREET, SPORTY, NATURAL, MANNISH, CASUAL, ELEGANT, MODERN, FORMAL, ETHNIC</possibleValues>
</styleList>
6. <textureList>
<Constraint>Multiple values. `null` if there is no possible matching value</Constraint>
<possibleValues>FUR, KNIT, MOUTON, LACE, SUEDE, LINEN, ANGORA, MESH, CORDUROY, FLEECE, SEQUIN_GLITTER, NEOPRENE, DENIM, SILK, JERSEY, SPANDEX, TWEED, JACQUARD, VELVET, LEATHER, VINYL_PVC, COTTON, WOOL_CASHMERE, CHIFFON, SYNTHETIC_POLYESTER</possibleValues>
</textureList>
7. <category>
<Constraint>Please categorize into <subCategory>. Essential value. Possible values are expressed as <parentCategory>sub categories</parentCategory></Constraint>
<possibleValues>
<상의>탑, 블라우스, 티셔츠, 니트웨어, 셔츠, 브라탑, 후드티</상의>
<하의>: 청바지, 팬츠, 스커트, 레깅스, 조거팬츠</하의>
<아우터>코트, 재킷, 점퍼, 패딩, 베스트, 가디건, 짚업</아우터>
<원피스>드레스, 점프수트</원피스>
<신발>운동화, 구두, 샌들</신발>
<악세서리>주얼리, 기타, 모자</악세서리>
<가방>가방, 백팩, 힙색</가방>
</possibleValues>
</category>
8. <isOnlyItem><Constraint>`true` if the photo contains only items, `false` otherwise.</Constraint><possibleValues>`true`, `false`</possibleValues><isOnlyItem>

Follow these steps to extract the properties:
step1 - If <color> exists, ignore the color guessed from the photo and use the <possibleValues> from <colorList> that most closely resembles the <color> value.
step2 - Guess all properties of the item corresponding to <type> in the photo based on `Attributes:`.
step3 - Check whether the guessed property complies with the <Constraint> of `Attributes:` and correct the incorrect part.
step4 - Check whether the guessed property exists in the <possibleValues> of each `Attributes:` and if not, replace it with the most similar value.
step5 - Please list the properties of items that cannot be expressed using `Attributes:` in detail in words and express them as `extra`.

Response Format:
Please return it in JSON format as in the following example.
{
<order> value :{"fit" : "OVER_FIT","colorList" : ["BLACK", "YELLOW"],"patternList" : ["STRIPED"],"seasonList" : ["SPRING", "SUMMER", "AUTUMN"],"styleList" : ["CASUAL", "SPORTY"],"textureList" : ["MESH"],"extra" : "sleeveless, cropped","parentCategory" : "상의","subCategory":"탑", "isOnlyItem":true|false}
}
"""

    def parse_response(self, response: dict) -> tuple[dict[int, Attributes], list[str]]:
        raw_data = {}
        for k, v in response.items():
            if isinstance(k, str):
                k=int(k)
            raw_data[k] = GPTAttrResponse(**v)
        logging.info("속성 추출 성공 "+str(raw_data))
        print(raw_data)
        return run_validate(raw_data)

    def get_response(self) -> dict[Any, Any]:
        user_content: list = self.make_user_content()
        response = self.client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": ExtractAttribute.system_prompt
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": user_content
                },
            ],
            temperature=0,
            max_tokens=75 * len(user_content),
            top_p=0.9,
            frequency_penalty=0,
            presence_penalty=0
        )

        return json.loads(response.choices[0].message.content)

    def get_result(self):
        pass

    def make_user_content(self):
        pass


class ExtractAttributesURL(ExtractAttribute):
    dataList: list

    def __init__(self, data: list[NormalizedClothes]):
        super().__init__()
        self.dataList = data

    def make_user_content(self) -> list:
        content_list = []
        for data in self.dataList:
            content_list.extend([{
                "type": "image_url",
                "image_url": {
                    "url": f"{data.imgUrl}",
                    "detail": "low"
                }
            }, {
                "type": "text",
                "text": f"<clothes><order>{data.clothId}</order><type>{data.category}</type><color>{data.color if data.color else ''}</color></clothes>"
            }])
        return content_list

    def get_result(self) -> tuple[dict[int, Attributes], list[str]]:
        return self.parse_response(self.get_response())


class ExtractAttributesImage(ExtractAttribute):
    image: str
    type: str

    def __init__(self, image: str, type:str):
        super().__init__()
        self.image = image
        self.type = type

    def make_user_content(self) -> list:
        return [{
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{ self.image}",
                "detail": "low"
            }
        }, {
            "type": "text",
            "text": f"<clothes><order>{0}</order><type>{self.type}</type></clothes>"
        }]

    def get_result(self) -> Attributes:
        return self.parse_response(self.get_response())[0][0]
