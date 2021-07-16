# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:12-alpine as build-stage

WORKDIR /app

RUN apk add --no-cache \
    bash \
    python \
    git \
    nano

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ARG ENV

RUN if [ "$ENV" = "dev" ]; then\
    npm run build-dev;\
  elif [ "$ENV" = "stg" ]; then\
    npm run build-stg;\
  else\
    npm run build;\
fi

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/VIERA-FRONTEND/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
