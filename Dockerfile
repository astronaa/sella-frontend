# Use Node.js 18 Alpine
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables to prevent API calls during build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Accept build arguments from Railway
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_TG_BOT_NAME
ARG NEXT_PUBLIC_TRONGRID_API_KEY
ARG NEXT_PUBLIC_INFURA_API_KEY
ARG NEXT_PUBLIC_RAINBOWKIT_APP_NAME
ARG NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID
ARG DOCS_FILE_URL

# Set environment variables from build arguments
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_TG_BOT_NAME=$NEXT_PUBLIC_TG_BOT_NAME
ENV NEXT_PUBLIC_TRONGRID_API_KEY=$NEXT_PUBLIC_TRONGRID_API_KEY
ENV NEXT_PUBLIC_INFURA_API_KEY=$NEXT_PUBLIC_INFURA_API_KEY
ENV NEXT_PUBLIC_RAINBOWKIT_APP_NAME=$NEXT_PUBLIC_RAINBOWKIT_APP_NAME
ENV NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=$NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID
ENV DOCS_FILE_URL=$DOCS_FILE_URL

# Build the application with increased timeout and memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]