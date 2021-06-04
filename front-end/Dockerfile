FROM node:lts AS build
WORKDIR /app/front-end
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
# RUN npm run build


# NGINX SERVER
# FROM nginx:1.19.0-alpine AS prod
# COPY --from=build /app/front-end/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

