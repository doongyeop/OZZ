from openai import OpenAI

from app.core.client.clothesMetadata import ClothesMetadata, clothesMetadata


class OpenAIClient:
    client: OpenAI = None
    clothes_metadata: ClothesMetadata = clothesMetadata

    def __init__(self):
        self.client = OpenAI()
