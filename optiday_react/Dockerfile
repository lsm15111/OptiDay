FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# 7. Nginx 포트 설정
EXPOSE 80

# 8. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
