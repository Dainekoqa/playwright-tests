import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
    browserName: 'chromium',
    headless: false,  
    viewport: { width: 1280, height: 720 },
  },
});
