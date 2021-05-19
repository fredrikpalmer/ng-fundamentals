FROM node as builder

WORKDIR /app

COPY ./package*.json /app/
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ng-fundamentals /usr/share/nginx/html
