FROM node:latest AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo "server { listen 80; location /health { return 200; } }" > /etc/nginx/conf.d/health.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]