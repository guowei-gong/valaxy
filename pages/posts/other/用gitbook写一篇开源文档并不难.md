---
title: 用gitbook写一篇开源文档并不难
date: 2021-01-04 18:05:01
categories:
    - 无处安放
tags:
    - 开源
---
## 👯 前言
为什么会产生这个需求呢？<br/>
你期待更多人来使用你的项目 🥳 <br/>
给你的项目加 Star🌟 或者 PR 🤔 <br/>
好的项目除了自身契合开发者的需求外，还需要一个好的 README 🍻

## 📚 效果图预览
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540a9cdceca3425d9ce45072b1914c8d~tplv-k3u1fbpfcp-watermark.image)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0bffc9db8e8470992d167fd803a0a43~tplv-k3u1fbpfcp-watermark.image)


## 🔭 思路
- 初始化 Gitbook
- 创作你的内容
- 插件是扩展的最好方式
- 生成静态页面
- 部署

## 💻 实现
- **检查 node 版本，建议使用 v10.16.0 或 v10.23.0**
	

> 请务必使用 NVM 管理 Node 版本，灵活的切换 Node，尽管官方推荐 v4.0.0 即可<br/>因为 Gitbook 使用最新版本 Node，出现了依赖无法安装的问题

- **全局安装 Gitbook-cli<br/>**```$ npm install gitbook-cli -g```
> 安装时长与网络相关，约 5 ~ 15 分钟
- **创建一本书<br/>**```$ gitbook init```
> 如果您希望将图书创建到指定目录，可以通过 gitbook init ./directory

- **预览样板书<br/>**```$ gitbook serve```

- **选择优秀的 NPM 插件，例如评论模块、文档全局搜索、增加黑夜模式等**<br>[点击跳转 book.json 示例](#book.json)
   - 添加插件<br>编辑 book.json 文件，执行命令 ```$ gitbook install``` 
   - 删除**默认**插件<br>编辑 book.json 文件，在插件名称前面加 -<br/>如果是自己自定义的，删除 json 中的对应配置即可
   - [定制页脚](https://github.com/zq99299/gitbook-plugin-page-footer-ex)
   
   - [中文搜索](https://www.npmjs.com/package/gitbook-plugin-search-pro)
   - [捐赠打赏](https://github.com/willin/gitbook-plugin-donate)
   - [阅读量统计](https://www.cnblogs.com/mingyue5826/p/10307051.html)
   - [标题栏图标](https://github.com/Bandwidth/gitbook-plugin-custom-favicon)
   - [Google Analysis](https://github.com/GitbookIO/plugin-ga)
   - [Disqus 评论插件](https://github.com/GitbookIO/plugin-disqus)
   - [flexible-alerts 警报](https://github.com/zanfab/gitbook-plugin-flexible-alerts)
- **生成静态页面**<br/>```$ gitbook build```
- **部署**<br/>
	略


## 🎉 结语
本人技术能力有限，如果有写的不对的地方，请留言斧正，十分感谢 🙇<br>
如果没有解决您的问题，首先十分抱歉耽误您的时间，可以在下方评论区留言，看到后我会第一时间回复🙍‍♂️

## 🪁 <span id="book.json">book.json</span>
```
{
    "title": "Summary",
    #插件名称
    "plugins": [
        "back-to-top-button",
        "chapter-fold",
        "code",
        "splitter",
        "disqus",
        "-lunr",
        "-search",
        "search-pro",
        "insert-logo",
        "custom-favicon",
        "pageview-count",
        "tbfed-pagefooter",
        "popup",
        "-sharing",
        "sharing-plus"
    ],
    #插件具体配置
    "pluginsConfig": {
        "insert-logo": {
            "url": "http://xxx.png",
            "style": "background: none; max-height: 30px; min-height: 30px"
        },
        "favicon": "./xxx.ico",
        "tbfed-pagefooter": {
            "copyright": "xiaowei",
            "modify_label": "该文章修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        },
        "sharing": {
            "douban": true,
            "facebook": true,
            "google": true,
            "pocket": true,
            "qq": true,
            "qzone": true,
            "twitter": true,
            "weibo": true,
            "all": [
                "douban",
                "facebook",
                "google",
                "instapaper",
                "linkedin",
                "twitter",
                "weibo",
                "messenger",
                "qq",
                "qzone",
                "viber",
                "whatsapp"
            ]
        },
        "disqus": {
            "shortName": "neihancloud"
        }

    }
}
```