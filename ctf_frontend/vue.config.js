var path = require('path')

module.exports = {
  outputDir : path.resolve(__dirname, "../backend/public"),
  devServer : {
    proxy : {
      'mark_code' : {
        target: 'http://52.78.48.222:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/mark_code': ''
        }
      }
    }
  }
}
