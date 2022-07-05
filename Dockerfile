### STAGE 1: Build ###
FROM node as build

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent


COPY . ./

RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx
WORKDIR /var/www/html/
# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/build /var/www/html/backoffice
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# CMD ["nginx", "-g", "daemon off;"]

