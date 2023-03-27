FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL="https://tgjnmxhhmi.eu-central-1.awsapprunner.com/api"

RUN npm ci
COPY . ./

RUN npm run build

FROM nginx:latest
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
