//在vue.config.js 中配置文件
const path = require('path')
const url = 'http://192.168.1.112:6080'
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
   // 配置转发代理
  //  devServer: {
  //   disableHostCheck: true,
  //   port: 8080,
  //   proxy: {
  //     '/': {
  //       target: url,
  //       ws: false, // 需要websocket 开启
  //       pathRewrite: {
  //         '^/': '/'
  //       }
  //     }
  //     // 3.5 以后不需要再配置
  //   }
  // },
  chainWebpack: config => {
    devtool:'source-map',
    config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    
  }
}
