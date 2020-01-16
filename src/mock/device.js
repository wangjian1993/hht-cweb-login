import Mock from 'mockjs'

let List = (Mock.mock({
  'list|15': [
    {
      'sysid|+1': 1,
      'devid|8': /[a-z][0-9]/,
      'ddevclassname|1': [
        '故事机',
        '扫地机',
        '智能音箱'
      ],
      'dname': /[a-z][a-z][a-z][0-9]/,
      'status|1': [1, 2, 3, 4],
      'dfullName|1': ['杭州小嗨科技有限公司', '摇篮科技', '同与方有限公司'],
      'uusername': '杭州展示科技有限公司',
      'bandingeventtime': '@datetime(yyyy-MM-dd HH::mm:ss)',
      'fristonlinetime': '@datetime(yyyy-MM-dd HH::mm:ss)',
      'lastonlinetime': '@datetime(yyyy-MM-dd HH::mm:ss)'
    }
  ]

}))

export default {
  getList: () => List,
  getDeviceList: () => {}
}
