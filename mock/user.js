const tokens = {
  admin: {
    token: 'admin-token'
  },
  other: {
    token: 'other-token'
  }
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super admin',
    name: 'Super Admin'
  },
  'other-token': {
    roles: ['other'],
    introduction: 'I am an other',
    name: 'Normal Other'
  }
};

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: req => {
      const { username } = req.body;
      const token = tokens[username];

      if(!token) {
        return {
          code: 60204,
          message: '获取token失败',
          success: false
        }
      }

      return {
        code: 20000,
        data: token,
        message: '获取token成功',
        success: true
      }
    }
  },
  {
    url: '/user/info',
    type: 'get',
    response: req => {
      const { token } = req.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '获取用户信息失败',
          success: false
        }
      }

      return {
        code: 20000,
        data: info,
        message: '获取用户信息成功',
        success: true
      }
    }
  },
];
