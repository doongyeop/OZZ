from pydantic import BaseModel, field_validator
from typing import Union


class NormalizedClothes(BaseModel):
    clothId: int
    name: str
    category: str
    color: str | None
    imgUrl: str


class ImageMetadata(BaseModel):
    clothId: int
    categoryLowId: int
    imgUrl: str
    isOnlyItem: bool


class AttributeBase(BaseModel):
    fit: Union[str | None] = None
    colorList: list[str]
    patternList: Union[list[str] | None] = None
    seasonList: Union[list[str] | None] = None
    styleList: Union[list[str] | None] = None
    textureList: Union[list[str] | None] = None
    extra: str

    @field_validator('*', mode='before')
    def replace_null_string_with_none(cls, value):
        if value == "null":
            return None
        return value


class Attributes(AttributeBase):
    categoryLowId: int
    isOnlyItem: bool


class GPTAttrResponse(AttributeBase):
    parentCategory: str
    subCategory: str
    isOnlyItem: bool


class LowCategoryResponse(BaseModel):
    categoryLowId: int
    name: str


class HighCategoryResponse(BaseModel):
    categoryHighId: int
    name: str


class AttributeResponse(AttributeBase):
    categoryHigh: HighCategoryResponse
    categoryLow: LowCategoryResponse
    image: str
