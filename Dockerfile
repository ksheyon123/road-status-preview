# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:18-alpine AS runner

WORKDIR /app

# 프로덕션 종속성만 설치
COPY package*.json ./
RUN npm install

# 빌드된 파일과 필요한 파일들만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/src ./src

# 환경 변수 설정
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]