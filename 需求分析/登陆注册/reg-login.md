## 登陆方式汇总

### 方式1：账号密码登录
* 查询是否有账号信息
* 查询密码是否正确
* 用户登录

### 方式2：手机验证码登录
* step1：发送验证码
* step2：mongo存储手机号和验证码以及过期时间
* step3：验证验证码是否正确以及账号是否存在
* step4：如果账号存在直接登录，不存在，先注册，后登录

### 方式3：扫描二维码登录
* step1：先生成二维码对应的唯一标识key
* step2：存储key对应的扫码状态
* step3：不断查询二维码对应的状态
* step4：app中扫码后更新二维码状态
* step5：web知道二维码状态为成功后进行扫码登录

### 方式4：第三方登录（QQ|微信|apple）
* step1：第三方扫码登录微信，微信中配置相应的回调域名
* step2：微信会重定向到回调域名，并提供临时票据和code参数
* step3：web端可以通过临时票据和code参数（可能还会有其他参数，看具体平台，比如appID和appSecret）来换取access_token和openid
```json
{ 
"access_token":"ACCESS_TOKEN", 
"expires_in":7200, 
"refresh_token":"REFRESH_TOKEN",
"openid":"OPENID", 
"scope":"SCOPE",
"unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```
* step4：open_id是否在启信宝绑定过手机号，如果没有，手机号+验证码 先将手机号和open_id进行关联
* step5：通过accesstoken和openid关键参数从第三方中获取用户信息
* step6：用户存在即登录，不存在就注册然后登录

### 方式5：CC登录
* step1：【userCheckByCode】 先去cc获取授权票据code，然后通过code以及appId和appSecret获取到openid和access_token，然后把这些信息存储起来，校验用户的openId是否在启信宝中已经绑定了手机号，返回key（保存对应的信息）和是否绑定手机号标识
* step2：【qxbLogin】 客户端获取到key和是否绑定手机号标识后，如果没有绑定手机号，先去绑定手机号，绑定手机号的时候会往用户的表里面存一个open_id的标识（通过手机号关联），然后采用cc登录，通过key获取到openid和access_token，然后通过access_token来调用cc接口拿到open_id(和之前拿到的一致，有效期的校验)，最后通过手机号+open_id找到用户信息，并且登录


### 方式6：一键登录
* step1: 先在客户端中嵌入一键登录SDK，用户请求登录时，通过SDK与运营商的网络通信来手机用户的手机号码，在获取用户授权同意后，应用客户端获得接口接口调用token（SDK返回）
* step2: 客户端拿着SDK返回的token，来请求服务端登录接口，服务器接着去请求认证服务端接口获取用户手机号
* step3: 通过手机号查询用户是否在表中，有的话直接登录，没有创建后登录