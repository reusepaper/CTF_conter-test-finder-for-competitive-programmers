var path = require('path')

module.exports = {
  outputDir : path.resolve(__dirname, "../backend/public"),
  devServer : {
    proxy : {
      'source_code' : {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/source_code': ''
        }
      }
    }
  }
}
