import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: process.env.USERNAME || 'guest',
      password: process.env.PASSWORD || 'welcome2qauto',
    },
    browserName: 'chromium',
    headless: process.env.HEADLESS === 'true',
    viewport: { width: 1280, height: 720 },
  },
});
