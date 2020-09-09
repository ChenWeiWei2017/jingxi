const bodyParser = require('body-parser')

module.exports = app => {
  app.use(bodyParser.json())
  const userpool = [
    { username: 'chenweiwei', password: '123456' },
    { username: 'xiaod', password: 'root' }
  ]
  // 模拟注册接口
  app.post('/api/v1/register', (req, res) => {
    const { username } = req.body
    const isExist = userpool.some(v => v.username === username)
    if (isExist) {
      res.json({
        code: 40003,
        message: '用户已存在'
      })
    } else {
      res.json({
        code: 200,
        message: '注册成功'
      })
    }
  })
  // 模拟登陆接口
  const tokenKey = 'xdclass'
  app.post('/api/v1/login', (req, res) => {
    // post请求，参数在body中
    const { username, password } = req.body
    const success = userpool.some(u => u.username === username && u.password === password)
    if (success) {
      res.json({
        code: 200,
        message: '登陆成功',
        // 模拟token生成
        token: tokenKey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
      })
    } else {
      res.json({
        code: 40000,
        message: '账户名或密码错误'
      })
    }
  })

  app.get('/api/v1/home/banners', (req, res) => {
    res.json({
      code: 200,
      message: 'success',
      data: {
        banners: [
          {
            url: 'https://prodev.m.jd.com/mall/active/2o5cmXxvmhYaUEfSDDh5d1CNQaYz/index.html?babelChannel=ttt15&__jda=76161171.1597280091111364054504.1597280091.1599556990.1599642102.5',
            src: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/142059/27/7671/159036/5f565487E91db073e/fba3c1c6a0e4fd56.jpg!q70.jpg.dpg',
            title: '京西小魔方'
          },
          {
            url: 'https://prodev.m.jd.com/mall/active/FYXPxE3J9bnJ5LHvRMBNf4gJxMb/index.html?__jda=76161171.1597280091111364054504.1597280091.1599556990.1599642102.5',
            src: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146508/37/7510/182163/5f4f8e75E36063d3b/a3f2b14568de3eac.jpg!q70.jpg.dpg',
            title: '食品“味”爱团圆'
          },
          {
            url: 'https://pro.m.jd.com/mall/active/4Rdh55jwT8kdEpZ5WThVgfaFF9xJ/index.html?__jda=76161171.1597280091111364054504.1597280091.1599556990.1599642102.5',
            src: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/129575/24/11543/92914/5f4e0723E28b1d5b5/e4a7611f7a3d0074.jpg!q70.jpg.dpg',
            title: '战马有奖 扫码来赢'
          }
        ]
      }
    })
  })
}
