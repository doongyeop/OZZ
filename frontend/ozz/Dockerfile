# 1. 빌드 단계
FROM node:20-alpine AS builder

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. 패키지 파일 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 4. 애플리케이션 소스 복사
COPY . .

# 5. Next.js 애플리케이션 빌드
RUN npm run build

# 6. 런타임 단계
FROM node:20-alpine AS runner

# Puppeteer 실행에 필요한 패키지들을 설치
RUN apk update && \
    apk add --no-cache \
        chromium \
        nss \
        freetype \
        harfbuzz \
        ca-certificates \
        curl \
        wget

RUN apk update && \
    apk add --no-cache \
        xvfb

# puppeteer가 chromium-browser를 실행할 수 있도록 설정
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# 이미 chromium을 설치했기 때문에 puppeteer가 chromium을 다시 다운로드하지 않도록 설정
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# Xvfb에서 사용할 디스플레이 설정
ENV DISPLAY=:99  

# 7. 작업 디렉터리 설정
WORKDIR /app

# 8. 빌드된 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# 9. 환경 변수 설정 (필요 시)
COPY .env /app/.env

# 10. 포트 노출
EXPOSE 3000

# 11. Next.js 애플리케이션 실행
CMD Xvfb :99 -screen 0 1024x768x16 -ac & npm start
