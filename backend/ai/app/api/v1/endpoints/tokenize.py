from fastapi import APIRouter
# from pydantic import BaseModel
# from transformers import BertTokenizer, BertModel
# import torch
#
# # 모델과 토크나이저 로드
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
# model = BertModel.from_pretrained('bert-base-uncased')
#
router = APIRouter(prefix="/vectorize", tags=["vectorize"])
#
# class TextRequest(BaseModel):
#     text: str
#
# @router.post("")
# def vectorize(query: TextRequest):
#     inputs = tokenizer(query.text, return_tensors='pt')
#     with torch.no_grad():
#         outputs = model(**inputs)
#     # [CLS] 토큰의 마지막 히든 상태를 벡터로 사용
#     vector = outputs.last_hidden_state[:, 0, :].squeeze().numpy()
#     vector = vector.tolist()  # 리스트로 변환하여 JSON 응답에 포함
#     return {"vector": vector}
#
# # 서버 실행 (터미널에서 uvicorn main:app --reload 실행)