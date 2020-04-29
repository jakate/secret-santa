const conf = require('./webpack.config.js')

module.exports = (env) => {
  env.watch = true
  const baseConf = conf(env)
  baseConf.resolve = {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
  return baseConf
}
