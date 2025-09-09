FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY database/package.json ./database/
WORKDIR /app/database
RUN pnpm install && pnpm add -D typescript
WORKDIR /app
COPY database ./database
WORKDIR /app/database
RUN pnpm run build

WORKDIR /app
COPY client/package.json ./
RUN pnpm install

COPY client/src ./src
COPY client/public ./public
COPY client/index.html ./
COPY client/vite.config.ts ./
COPY client/tsconfig.json ./
COPY client/tsconfig.app.json ./
COPY client/tsconfig.node.json ./
COPY client/tailwind.config.ts ./
COPY client/postcss.config.js ./

# Build the application
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
