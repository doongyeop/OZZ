import os
from typing import Any

import requests
from pydantic import BaseModel
import logging

from app.schemas.attributes import HighCategoryResponse, LowCategoryResponse


class LowCategory(BaseModel):
    categoryLowId: int
    name: str


class HighCategory(BaseModel):
    categoryHighId: int
    name: str
    categoryLowList: list[LowCategory]


class Property(BaseModel):
    code: str
    name: str


class Properties:
    name: str
    properties: list[Property]
    is_multiple: bool
    is_essential: bool
    description: str
    null_value: str = "None"

    def __init__(self, name, properties, is_multiple, is_essential, description):
        super().__init__()
        self.name = name
        self.properties = properties
        self.is_multiple = is_multiple
        self.is_essential = is_essential
        self.description = description

    def get_constraint(self):
        constraint_text = self.description
        if self.is_multiple:
            constraint_text += "Multiple values. "
        else:
            constraint_text += "Single value."
        if self.is_essential:
            constraint_text += "Essential values. "
        else:
            constraint_text += f"`{Properties.null_value}` if there is no possible matching value"
        return constraint_text

    def get_values(self):
        return ", ".join(self.properties)

    def validate(self, input_value: str | list[str] | None):
        if input_value is None or (isinstance(input_value,str) and input_value=="null"):
            if self.is_essential:
                return False
            else:
                return True
        if self.is_multiple:
            for e in input_value:
                if e not in self.properties:
                    return False
        else:
            if input_value not in self.properties:
                return False
        return True


class ClothesMetadata:
    categories: list[dict[str, Any]]
    attributes: list[str]
    fit: Properties
    season: Properties
    size: Properties
    style: Properties
    texture: Properties
    color: Properties
    pattern: Properties

    def __init__(self):
        self.category_dict_data = None
        self.low_category_2_code_data = None
        self.attr_dict_data = None
        response = requests.get(f"{os.getenv('CLOTHES_ENDPOINT')}/api/categories")
        if response.ok:
            self.categories = response.json()
            self.category_dict_data = self.category_dict()
            self.low_category_2_code_data = self.low_category_2_code()
        else:
            logging.error(f"{response.request.url} 카테고리 불러오기 실패, {str(response.json())}")
            raise ConnectionError
        response = requests.get(f"{os.getenv('CLOTHES_ENDPOINT')}/api/clothes/properties/all")
        if response.ok:
            self.attributes = response.json()
            self.attr_dict_data = self.attr_dict()
            self.fit = Properties("FIT", self.attr_dict_data["FIT"], False, False, "Type to how clothes fit body.")
            self.season = Properties("SEASON", self.attr_dict_data["SEASON"], True, False, "Suitable season to wear.")
            self.size = Properties("SIZE", self.attr_dict_data["SIZE"], False, False, "")
            self.style = Properties("STYLE", self.attr_dict_data["STYLE"], True, False,
                                    "Unique appearance or atmosphere.")
            self.texture = Properties("TEXTURE", self.attr_dict_data["TEXTURE"], True, False, "")
            self.color = Properties("COLOR", self.attr_dict_data["COLOR"], True, True,
                                    "Identify up to 3 primary colors,")
            self.pattern = Properties("PATTERN", self.attr_dict_data["PATTERN"], True, False, "")
        else:
            logging.error(f"{response.request.url} 옷 속성 불러오기 실패, {str(response.json())}")
            raise ConnectionError

    def attr_dict(self):
        if self.attr_dict_data is not None:
            return self.attr_dict_data
        result = {}
        for attr in self.attributes:
            category_name = attr['name']
            codes = [attr_values['code'] for attr_values in attr['properties']]
            result[category_name] = codes
        return result

    def category_dict(self):
        if self.category_dict_data is not None:
            return self.category_dict_data
        result = {}
        for category in self.categories:
            category_name = category['name']
            low_names = [item['name'] for item in category['categoryLowList']]
            result[category_name] = low_names
        return result

    def low_category_2_code(self):
        if self.low_category_2_code_data is not None:
            return self.low_category_2_code_data
        low_category_2_code_dict = {}
        for category in self.categories:
            for low_category in category['categoryLowList']:
                low_category_2_code_dict[low_category["name"]] = low_category["categoryLowId"]
        return low_category_2_code_dict

    def lowcategoryId_to_highcategoryId(self, lowcategoryId):
        for category in self.categories:
            for lowCategory in category['categoryLowList']:
                if lowCategory['categoryLowId'] == lowcategoryId:
                    return category['categoryHighId']
        return None  # 일치하는 lowcategoryId가 없을 경우 None 반환

    def lowcategoryName_to_highcategoryId(self, lowcategoryName):
        for category in self.categories:
            for lowCategory in category['categoryLowList']:
                if lowCategory['name'] == lowcategoryName:
                    return category['categoryHighId']
        return None  # 일치하는 lowcategoryId가 없을 경우 None 반환

    def lowcategoryId_to_highcategoryName(self, lowcategoryId):
        for category in self.categories:
            for lowCategory in category['categoryLowList']:
                if lowCategory['categoryLowId'] == lowcategoryId:
                    return category['name']
        return None

    def low_categoryId_to_low_high_response(self, lowCategoryId: int):
        for high_category in self.categories:
            for lowCategory in high_category['categoryLowList']:
                if lowCategory['categoryLowId'] == lowCategoryId:
                    return HighCategoryResponse(**high_category), LowCategoryResponse(**lowCategory)
        return None, None


clothesMetadata = ClothesMetadata()
