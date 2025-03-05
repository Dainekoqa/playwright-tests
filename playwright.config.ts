import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space/',  
    browserName: 'chromium',
    headless: false,  // Run tests in visible mode
    viewport: { width: 1280, height: 720 },
  },
});
