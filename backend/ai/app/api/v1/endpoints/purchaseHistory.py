from fastapi import APIRouter

from sse_starlette.sse import EventSourceResponse

from app.core.client.normalizePurchaseHistory import NormalizePurchaseHistory
from app.schemas.purchaseHistory import PurchaseHistory

router = APIRouter(prefix="/purchase-history", tags=["Attributes"])


@router.post("/normalize")
def normalize_endpoint(histories: list[PurchaseHistory]):
    client = NormalizePurchaseHistory(histories)
    return EventSourceResponse(client.get_response())