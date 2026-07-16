import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset URLs are required for plain FTP hosting/subfolders.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        settings: 'html/settings.html',
        board: 'html/board.html',
        endscreen: 'html/endscreen.html'
      }
    }
  }
})
