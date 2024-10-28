FROM node:18.12.1 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm
# RUN apk add --no-cache python3 make g++
# ENV PYTHON /usr/bin/python3
FROM base as dependencies
WORKDIR /web-baryon
COPY package.json ./
COPY .npmrc ./
COPY pnpm-lock.yaml ./
RUN pnpm install

FROM base as builder
WORKDIR /web-baryon
COPY . .
COPY --from=dependencies /web-baryon/node_modules ./node_modules
COPY ./docker/production/.env.build .env
RUN pnpm build


FROM base as runner
WORKDIR /web-baryon
# ENV NODE_ENV staging
# If you are using a custom next.config.js file, uncomment this line.
#COPY next.config.js ./
#COPY --from=builder /web-baryon/next.config.js ./
COPY --from=builder /web-baryon/public ./public
COPY --from=builder /web-baryon/build ./build
COPY --from=builder /web-baryon/node_modules ./node_modules
COPY --from=builder /web-baryon/package.json ./package.json
COPY --from=builder /web-baryon/server ./server
COPY --from=builder /web-baryon/craco.config.js ./craco.config.js
COPY --from=builder /web-baryon/.env ./.env

EXPOSE 3000
CMD ["pnpm", "start"]