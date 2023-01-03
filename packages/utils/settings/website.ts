/**
 * 全局配置文件
 */
export default {
  title: 'shy',
  logo: 'S',
  key: 'saber', //配置主键,目前用于存储
  indexTitle: 'Shy Admin',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: false, // 是否开启租户模式
  tenantId: '000000', // 管理组租户编号
  captchaMode: false, // 是否开启验证码模式
  switchMode: false, // 是否开启部门切换模式
  tokenTime: 3000,
  tokenHeader: 'Blade-Auth',
  //http的status默认放行列表
  statusWhiteList: [],
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
  // 第三方系统授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 流程设计器地址
  flowDesignUrl: 'https://design.bladex.vip',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
  // 单点登录系统认证(blade-auth服务的地)
  ssoUrl:
    'http://localhost:8100/oauth/authorize?client_id=saber&response_type=code&redirect_uri=',
  // 单点登录回调地址(Lemon服务的地址)
  redirectUri: 'http://localhost:3100'
}
