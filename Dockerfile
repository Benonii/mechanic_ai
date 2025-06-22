# Build stage
FROM oven/bun:1.1.10 AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

# Production stage
FROM oven/bun:1.1.10 AS runner

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "start"]
