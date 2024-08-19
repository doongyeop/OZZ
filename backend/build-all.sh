#!/bin/bash

# 빌드
./gradlew clean buildAll

# Docker 이미지 빌드 및 컨테이너 실행
docker-compose up -d --build