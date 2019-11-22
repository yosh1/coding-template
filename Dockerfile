# Dockerfile for multi staging build

# building
FROM alpine:latest as builder
RUN apk add --no-cache nodejs
COPY . .
RUN set -x && \
    npm set progress=false && \
    npm config set depth 0 && \
    npm i && \
    npm run build

# running
FROM alpine:latest as runner
RUN set -x && \
    apk add --no-cache nodejs && \
    npm uninstall -g npm
COPY . .
CMD ["npm", "run", "start"]
