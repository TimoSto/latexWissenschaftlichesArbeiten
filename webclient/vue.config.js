const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8448/',
        ws: false
      }
    }
  },
  outputDir: './assets/dist',
})
