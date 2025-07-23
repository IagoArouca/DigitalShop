FROM node:20-alpine

WORKDIR /app

COPY ../../pnpm-lock.yaml ./pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

EXPOSE 5000
CMD ["pnpm", "start"]