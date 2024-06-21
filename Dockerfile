FROM node:22-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build --prod
FROM nginx:1.27.0-alpine
COPY --from=builder /usr/src/app/dist/my-budget/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
