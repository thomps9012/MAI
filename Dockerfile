FROM node:lts AS deps
WORKDIR /MAI
COPY package.json yarn.lock ./
RUN yarn install

FROM node:lts AS builder
WORKDIR /MAI
COPY . .
COPY --from=deps /MAI/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:lts AS runner
WORKDIR /MAI
ENV NODE_ENV production
COPY --from=builder /MAI/next.config.js ./
COPY --from=builder /MAI/public ./public
COPY --from=builder /MAI/.next ./.next
COPY --from=builder /MAI/node_modules ./node_modules
COPY --from=builder /MAI/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]