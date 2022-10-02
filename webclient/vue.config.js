const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8081/',
        ws: false
      }
    }
  },
  outputDir: './assets/dist',
})
