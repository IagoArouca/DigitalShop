FROM node:20-alpine AS build

WORKDIR /app

COPY ../../pnpm-lock.yaml ./pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN pnpm run build

FROM nginx:stable-alpine

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]