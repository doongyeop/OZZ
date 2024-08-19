from typing import Union

from fastapi import APIRouter, Header, Depends

from app.schemas.recommend import Consider, RecommendationsResponse
from app.services.recommend import RecommendService

router = APIRouter(prefix="/recommend", tags=["Recommendations"])


@router.post("", response_model=Union[list[RecommendationsResponse] | None])
async def extract_attributes(consider: Consider, x_user_id: str = Header(default=None),
                             service: RecommendService = Depends(RecommendService)):
    return service.get_recommend_outfit(x_user_id, consider)
