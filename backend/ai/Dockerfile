# 베이스 이미지로 Python 3.10 사용
FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt를 컨테이너의 작업 디렉토리로 복사
COPY requirements.txt .

# requirements.txt에 명시된 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스 코드를 컨테이너의 작업 디렉토리로 복사
COPY ./app ./app
COPY ./run.py ./run.py
COPY ./start.sh ./start.sh

# uvicorn을 사용하여 FastAPI 애플리케이션 실행
CMD ["bash", "./start.sh"]