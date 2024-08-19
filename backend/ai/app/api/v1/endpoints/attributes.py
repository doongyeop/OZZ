import base64
from io import BytesIO

from PIL import Image
from fastapi import APIRouter, UploadFile, Form, File

from app.core.client.ExtractAttribute import ExtractAttributesImage

from app.schemas.attributes import AttributeResponse
from app.utils.image_process import process
from app.utils.image_utils import image_to_base64str

router = APIRouter(prefix="/attributes", tags=["Attributes"])


@router.post("/extract", response_model=AttributeResponse)
async def extract_attributes(image: UploadFile = File(...), highCategory: str = Form(...)):
    image_data = image.file.read()
    image = Image.open(BytesIO(image_data))

    # Encode the file content to Base64
    base64_encoded = base64.b64encode(image_data)

    # Convert the Base64 bytes to a string
    base64_string = base64_encoded.decode('utf-8')
    client = ExtractAttributesImage(base64_string, highCategory)
    result = client.get_result()
    print(result)
    highCate, lowCate = client.clothes_metadata.low_categoryId_to_low_high_response(result.categoryLowId)
    print(str(highCate), str(lowCate))
    image = process(image, highCate.name, lowCate.name, result.isOnlyItem)
    image.save("temp.png")

    return {**result.model_dump(exclude={"categoryLowId", "isOnlyItem"}),
            "categoryHigh": highCate,
            "categoryLow": lowCate,
            "image": image_to_base64str(image)}
