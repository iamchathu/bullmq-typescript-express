# The base image with PNPM
FROM node:18-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@8 --activate

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

