FROM node:16.3.0-alpine
WORKDIR /server
COPY . .
RUN npm i
EXPOSE 3000
CMD npm run dev