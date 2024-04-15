# 小程序实战开发之路

## 代码规范

❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
❗️ 开发前必读 ❗️
❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️

[项目结构 及目录划分](./Guide.md)

### wxs 文件

    涉及到大量频繁计算的操作放入 .wxs 文件中
    交互比较卡顿的,可以用wxs 函数来响应

### WXML 规范

    基本组件使用优先级
        能用基本组件 view 、text、 button、 input等。
        减少嵌套,减少使用 scroll-view 等。

    标签尽量使用单标签闭合写法，如 input❗️❗️❗️
        <input /> <image />

    控制每行 HTML 的代码数量在单屏内，多出的代码进行换行处理，标签所带属性每个属性间进行换行。

```
    <input
     wx:if="{{classic.type===200}}"
     img="{{classic.img}}"
     content="{{classic.content}}"
     />

```

    循环语句添加 key❗️❗️❗️

```
    <switch wx:for="{{objectArray}}" wx:key="unique" >
      {{item.id}}
    </switch>
```

    循环语句 和 判断语句分开❗️❗️❗️

```
    <view wx:if="{{objectArray.length > 0}}">
        <switch wx:for="{{objectArray}}" wx:key="unique">
        {{item.id}}
        </switch>
    </view>
```

合理实用 class 样式，不要使用内联样式。

```
    // 不推荐
    <image style="width:100rpx;height:100rpx"></image>

    // 推荐使用❗️❗️❗️
    <image class="tag" />
```

    注释规范
    除组件外的其他块级元素，均需注释出其功能，并在其上下空出一行与其他代码进行区分。

    注：注意代码格式化，优先采用2个(或者4个,全局保持一致)空格缩进。

### CSS 规范

    rpx和px都能使用到，rpx是基于iPhone 6的逻辑像素点，
    在使用过程中针对屏幕做了适配，除了边框线以外，其他都是用rpx。

    class名称单词使用中划线方式，不使用驼峰命名

```
    .aa-cc {
        margin: 0 auto;
    }
```

    尽量使用简写属性，并且同一属性放置在一起，避免散乱；
    组件样式以 v-开头

```
    /** 使用简写属性 **/
    .v-image{
        margin: 0 auto;
    }

    /** 同一属性放在一块 **/
    .v-tag{
        margin-left: 10rpx;
        margin-right: 10rpx
    }
```

    同一个模块的css文件放在一起，关键样式需要注释，样式之间可以使用空行分割

```
    /* 页面容器 */
    .page-container {
       background: #f4f4f4;
    }

    /* 资金容器 */
    .asset-container {
        margin: 20rpx;
    }
```

    尽量采用 flex 进行布局，不推荐使用 float 以及 vertical-align

```
    .container{
        disaplay: flex;
        flex-dirextion: row
    }
```

    成组的 wxss 规则之间用块状注释。请勿在代码后面直接注释

```
    /** 修改 button 默认的点击态样式类 **/
    .button-hover {
        background-color: red;
    }
```

### JS 规范

❗️❗️❗️js 文件请做好如下格式：添加开发人员备注，日期，功能说明。❗️❗️❗️

```
  /**
  * Author: Meng
  * Date: 2022-03-01
  * Desc: 首页
  */
```

❗️❗️❗️ 生命周期函数在上，交互事件在中，请求耗时方法在下 ❗️❗️❗️

```
onLoad: function() {}, // 不要放耗时及复杂逻辑
onReady: function() {}, // 不重要接口或逻辑放置在此生命周期

普通函数 以 _name 命名
_initData: function() {},
_initEvents: function() {},

点击/交互事件函数 以 onName 命名
onItemClick: function() {},
onInputChange: function() {},

接口耗时任务函数 以 _name 或 接口属性(get,post...) 命名
getItemList: function() {},
postLogin: function() {},
```

    ❗️❗️❗️类名，包名：下划线命名法: 如 hot_spot❗️❗️❗️
    ❗️❗️❗️变量名，方法名：驼峰式命名法: 如 onClick❗️❗️❗️

    ❗️❗️❗️采用 ES6 关键字 let，const 定义，尽量不使用 var❗️❗️❗️

```
        const a = 1; // 定义常量

        let imageContent =  res.data; // 定义变量

        // 函数命名
        getInfo: function(){
          return '';
        }

        // 私有函数
        _getInfo: function(){
          return '';
        }
```

    ❗️❗️❗️类的命名-采用 下划线命名法 命名法：❗️❗️❗️
    banner_com / banner_com.js
    login / login.js

    方法命名规范

    ❗️❗️❗️私有方法使用下划线开头❗️❗️❗️
     _getOrder: function() {},

    ❗️❗️❗️点击事件使用on开头❗️❗️❗️
    onUserIconTap: function() {}

    函数名前缀需加上清晰的动词表示函数功能
    回调函数推荐使用 Promise，回调成功的参数统一为 res，错误参数为 err

```
    const back = new Promise((resolve, reject) => {
        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
    });

    back.then((res) => {
        console.log('成功回调！', res);
    }).catch((err) => {
         console.log('失败回调！', err);
    });
```

    数据绑定变量定义规范所有涉及到 数据绑定 的 变量 均需在 data 中初始化。
    禁止 在 不定义 的情况下直接 setData;
    无状态 变量 放置在_lets: {}中

```
    Pages({
       _lets: { tag: null },
       data:{
          id : null
        }
        onLoad:function(event){
          let id = event.target.dataset.id
          this._lets.tag = Date.now()
          this.setData({id})
        }
      })
```

### 组件规范

    组件名称为多个单词 （必要）

    组件名命名规范: 应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该
    全部以一个特定的前缀开头，比如 app(a)、或 v-(v_)。
    若组件名称为多个单词名拼接而成，采用 ’-’或者 '_' 连接。
    自定义组件标签 推荐使用单闭合标签。<a_picker />

    和父组件紧密耦合的子组件应该以父组件名作为前缀命名组件名，以描述性的修饰词结尾。
    命名格式采用如下形式：v-{parent}-{name} 或者 v_{parent}_{name}， v-user-icon 或 v_user_icon

    触发事件规范: 组件点击触发事件建议用冒号分隔开
    <v-test-name bind:myevent="onMyEvent" />
    或
    <v_user_label bind:onpress="onEvent" />

    组件样式规范: 所有组件样式均应采用类的写法，且命名必须以 v- 开头，不推荐使用内联样式以及 id 样式

```
    .v-container{
        disaplay: flex;
        flex-dirextion: row
    }
```

    标点规范
        wxml、css、JSON 中均应使用双引号.
        css 属性中冒号中后面用一个空格分隔开.
        js 中字符串拼接使用反引号 `` ,字符串使用单引号'' , 不使用双引号.
