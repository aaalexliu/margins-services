FROM nginx:mainline-alpine

LABEL maintainer="alexliusiqing@gmail.com"

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dhparam-2048.pem /etc/letsencrypt/dhparam-2048.pem

EXPOSE 80 443