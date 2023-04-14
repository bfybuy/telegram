FROM node:latest  as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
EXPOSE 5757
CMD [ "node", "app.js" ]

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app /app
COPY nginx.conf /etc/nginx/nginx.conf

# docker build -t bfybuy-telegram .
# docker run -p 3333:3333 bfybuy-telegram

# FROM node:latest as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ .
# RUN npm run build
