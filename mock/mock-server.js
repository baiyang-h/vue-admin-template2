const Mock = require('mockjs');
const mocks = require('./index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


function registerRoutes(app) {
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for(const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
  }
}

function responseFake(url, type, response) {
  return {
    url,
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path);
      res.json(Mock.mock(response(req)))
    }
  }
}

module.exports = app => {
  // 解析 application/json
  app.use(bodyParser.json());
  // 解析 application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  registerRoutes(app)
};
