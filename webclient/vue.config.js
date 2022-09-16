const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/getPDF': {
        target: 'http://localhost:8081/getPDF'
      },
      '/': {
        target: 'http://localhost:8081/',
        ws: false
      }
    }
  },
  outputDir: './assets/dist',
  pages: {
    index: {
      // entry for the page
      entry: 'src/index/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    install: {
      // entry for the page
      entry: 'src/install/main.ts',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'install/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Install Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'install']
    }
  }
})
