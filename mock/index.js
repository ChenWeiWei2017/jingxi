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
        data: {
          // 模拟token生成
          token: tokenKey + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
        }
      })
    } else {
      res.json({
        code: 40000,
        message: '账户名或密码错误'
      })
    }
  })

  app.get('/api/v1/logout', (req, res) => {
    res.json({
      code: 200,
      message: 'success'
    })
  })

  app.get('/api/v1/userinfo', (req, res) => {
    const token = req.headers['xd-token']
    if (token && token.trim() !== '') {
      res.json({
        code: 200,
        message: 'success',
        data: {
          name: '陈伟伟',
          avatar: 'https://chenww-1259746772.cos.ap-shanghai.myqcloud.com/cmt/avatar/2-1564643605309.jpg'
        }
      })
    } else {
      res.json({
        code: -1,
        message: '用户未登录'
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

  app.get('/api/v1/type', (req, res) => {
    res.json({
      code: 200,
      message: 'success',
      data: [
        {
          id: 0,
          title: '热门推荐'
        },
        {
          id: 11,
          title: '手机数码'
        },
        {
          id: 2,
          title: '电脑办公'
        },
        {
          id: 3,
          title: '家用电器'
        },
        {
          id: 4,
          title: '美妆护肤'
        },
        {
          id: 5,
          title: '京西超市'
        },
        {
          id: 6,
          title: '个护清洁'
        },
        {
          id: 7,
          title: '汽车生活'
        },
        {
          id: 8,
          title: '男装'
        },
        {
          id: 9,
          title: '男鞋'
        },
        {
          id: 10,
          title: '女装'
        },
        {
          id: 11,
          title: '女鞋'
        },
        {
          id: 12,
          title: '图书音像'
        },
        {
          id: 13,
          title: '零食'
        }
      ]
    })
  })

  app.get('/api/v1/type/goods', (req, res) => {
    const { typeId } = req.query
    // eslint-disable-next-line eqeqeq
    if (typeId == 0) {
      res.json({
        code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            title: '小米手环5 NFC版',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/142719/12/444/104550/5ee1988cEd952bf51/74860b136a001168.jpg!q70.dpg.webp',
            description: '小米手环5 NFC版 石墨黑 动态彩屏  智能运动监测 内置小爱同学语音遥控手机 伸手即可刷卡磁吸式充电',
            price: '229.00'
          },
          {
            id: 2,
            title: 'iPhone 11',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp',
            description: 'Apple iPhone 11 (A2223) 128GB 白色 移动联通电信4G手机 双卡双待',
            price: '5899.00'
          },
          {
            id: 3,
            title: 'MacBook Pro 2020 13.3寸',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/117402/40/5319/122863/5eb2c3fcEca38019c/15285049766a8f59.jpg!q70.dpg.webp',
            description: 'Apple 2020新款 MacBook Pro 13.3【带触控栏】十代i5 16G 512G 2.0GHz 深空灰 笔记本电脑 轻薄本 MWP42CH/A',
            price: '14499.00'
          },
          {
            id: 4,
            title: 'Java核心技术卷',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t24022/68/2243624893/69240/5c5590db/5b796da4N613400e0.jpg!q70.dpg.webp',
            description: '正版Java核心技术卷I基础知识（原书第10版）+Java核心技术卷II特性 原书第9版',
            price: '191.80'
          },
          {
            id: 5,
            title: '蒙牛纯甄',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/116471/3/15357/100053/5f3cd609E272b7dc9/a4dbce063b22dc9b.jpg!q70.dpg.webp',
            description: '蒙牛纯甄 常温风味酸牛奶 200g*24 礼盒装',
            price: '91.90'
          },
          {
            id: 6,
            title: '半小时漫画中国史系列+世界史（共5册）',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/149885/8/323/418651/5ee08162Eec627e78/4735ed25b576f081.jpg!q70.dpg.webp',
            description: '半小时漫画中国史系列+世界史（共5册）看半小时漫画，通五千年历史！专享赠送历史大事记！',
            price: '209.40'
          },
          {
            id: 7,
            title: '泉林本色卷纸',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/134724/2/9636/195487/5f59dee0E5a89b7e7/9acf959a8520af34.jpg!q70.dpg.webp',
            description: '泉林本色卷纸 不漂白3层280节*27卷（耐用高节数 本色卫生厕卷纸巾）整箱销售',
            price: '49.90'
          },
          {
            id: 8,
            title: '小米巨能写',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/142492/4/4493/43739/5f28c21eEd88c62fe/c190262c5df54c7e.jpg!q70.dpg.webp',
            description: '小米巨能写中性笔 10支装 黑色 0.5mm 商务办公学生中性笔会议笔',
            price: '9.99'
          }
        ]
      })
    } else {
      res.json({
        code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            title: '小米手环5 NFC版',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/142719/12/444/104550/5ee1988cEd952bf51/74860b136a001168.jpg!q70.dpg.webp',
            description: '小米手环5 NFC版 石墨黑 动态彩屏  智能运动监测 内置小爱同学语音遥控手机 伸手即可刷卡磁吸式充电',
            price: '229.00'
          },
          {
            id: 2,
            title: 'iPhone 11',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp',
            description: 'Apple iPhone 11 (A2223) 128GB 白色 移动联通电信4G手机 双卡双待',
            price: '5899.00'
          },
          {
            id: 3,
            title: 'MacBook Pro 2020 13.3寸',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/117402/40/5319/122863/5eb2c3fcEca38019c/15285049766a8f59.jpg!q70.dpg.webp',
            description: 'Apple 2020新款 MacBook Pro 13.3【带触控栏】十代i5 16G 512G 2.0GHz 深空灰 笔记本电脑 轻薄本 MWP42CH/A',
            price: '14499.00'
          },
          {
            id: 4,
            title: 'Java核心技术卷',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t24022/68/2243624893/69240/5c5590db/5b796da4N613400e0.jpg!q70.dpg.webp',
            description: '正版Java核心技术卷I基础知识（原书第10版）+Java核心技术卷II特性 原书第9版',
            price: '191.80'
          },
          {
            id: 5,
            title: '蒙牛纯甄',
            cover: 'https://img10.360buyimg.com/mobilecms/s234x234_jfs/t1/116471/3/15357/100053/5f3cd609E272b7dc9/a4dbce063b22dc9b.jpg!q70.dpg.webp',
            description: '蒙牛纯甄 常温风味酸牛奶 200g*24 礼盒装',
            price: '91.90'
          }
        ]
      })
    }
  })
}
