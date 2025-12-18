import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:5173',
  timeout: 5000,
  expect: {
    timeout: 5000,
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
  use: {
    trace: 'on-first-retry',
  },
  reporter: 'line',
});
