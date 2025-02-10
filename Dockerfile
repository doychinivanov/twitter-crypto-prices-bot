FROM node:22-bullseye-slim as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN chown -R node:node /app
USER node

FROM base as test
ENV NODE_ENV=development
COPY src ./src
COPY tests ./tests
COPY vitest.config.ts .
RUN npm install --only=development
CMD ["npm", "test"]

FROM base as production
ENV NODE_ENV=production
COPY src ./
RUN npm install --only=production \
    && npm build
WORKDIR /app/dist
CMD ["node", "index.js"]