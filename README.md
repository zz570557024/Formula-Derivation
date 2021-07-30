
# 公式计算器（FormulaDerivation）

## 开发语言
* 使用[微信小程序框架](https://developers.weixin.qq.com/miniprogram/dev/framework/)开发。

## UI框架
* [WeUI](https://weui.io/)
是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。

## 实现功能
* 表速、真速、马赫数计算
* 动压、静压计算
* 标准大气物理量计算
* 长度单位计算
* 速度单位计算

## 项目结构

```
|-- FormulaDerivation
    |-- .gitignore
    |-- app.js  //项目入口，创建应用程序对象
    |-- app.json  //项目配置
    |-- app.wxss
    |-- LICENSE
    |-- project.config.json
    |-- README.md
    |-- sitemap.json
    |-- image  //项目图片资源
    |-- pages
    |   |-- index.wxss    
    |   |-- finance  //首页
    |   |   |-- finance.js
    |   |   |-- finance.json
    |   |   |-- finance.wxml
    |   |   |-- finance.wxss
    |   |   |-- atm  //标准大气计算页
    |   |   |   |-- atm.js
    |   |   |   |-- atm.json
    |   |   |   |-- atm.wxml
    |   |   |   |-- atm.wxss
    |   |   |-- ...
    |   |-- logs  //日志输出页
    |   |   |-- logs.js
    |   |   |-- logs.json
    |   |   |-- logs.wxml
    |   |   |-- logs.wxss
    |   |-- pay  //点赞支付页
    |       |-- pay.js
    |       |-- pay.json
    |       |-- pay.wxml
    |       |-- pay.wxss
    |-- style  //UI样式资源
    |   |-- weui.wxss
    |   |-- base
    |   |-- widget
    |-- utils  //JS库
        |-- atm.js
        |-- calculatorForHouseLoan.js
        |-- finance.js
        |-- util.js
```

## 开发运行

<b>使用微信开发者工具打开项目运行与开发<b>

## 截图
![p1](./image/jt1.jpg)
![p2](./image/jt2.jpg)

## Contribution
RuShi

## License
MIT
