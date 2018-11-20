var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"https://restapi-test.xuanwonainiu.com"',
  API_CMS_URL: '"https://qf-bos.ab1m.cn"',
  API_MDSCJ_URL: '"https://qf-restapi.mdscj.com"'
})
