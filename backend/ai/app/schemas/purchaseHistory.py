from pydantic import BaseModel


class PurchaseHistory(BaseModel):
    name: str
    option: str