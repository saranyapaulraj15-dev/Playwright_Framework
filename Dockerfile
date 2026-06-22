# Official Playwright image already ships with all browsers + OS deps pre-installed
FROM mcr.microsoft.com/playwright:v1.48.0-jammy
 
WORKDIR /app
 
# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci
 
# Copy the rest of the framework
COPY . .
 
# Re-verify/install browsers (no-op if already present in the base image)
RUN npx playwright install --with-deps
 
# Default command runs the full suite; override at `docker run` time as needed,
# e.g. docker run <image> npx playwright test --grep @smoke
CMD ["npx", "playwright", "test"]
