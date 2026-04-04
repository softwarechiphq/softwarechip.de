FROM node:24-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:24-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["npm", "run", "start"]