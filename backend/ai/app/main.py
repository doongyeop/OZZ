import logging

from fastapi import FastAPI
from app.api.v1.endpoints import attributes, tokenize, purchaseHistory, recommend
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5500",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# API 라우터 설정
app.include_router(attributes.router, prefix="/api/v1")
app.include_router(tokenize.router, prefix="/api/v1")
app.include_router(purchaseHistory.router, prefix="/api/v1")
app.include_router(recommend.router, prefix="/api/v1")