import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://gongguowei.com/',
  lang: 'zh-CN',
  title: '1204 CORES',
  author: {
    name: '龚国玮',
    avatar: 'https://img-blog.csdnimg.cn/ffb4f691bdb14f628c598dd8858c6c53.jpeg',
  },
  subtitle: 'Discuss Go, Games.',
  description: '写代码是热爱，写到世界充满爱',
  favicon: 'https://img-blog.csdnimg.cn/ffb4f691bdb14f628c598dd8858c6c53.jpeg',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/guowei-gong',
      icon: 'i-ri-github-line',
      color: '#ECC5AB',
    },
    {
      name: '豆瓣',
      link: 'https://www.douban.com/people/gongguowei01/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/383069888',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'E-Mail',
      link: 'mailto:gongguowei01@gmail.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: true,
    // 设置类型为 Fuse
    type: 'fuse',
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
