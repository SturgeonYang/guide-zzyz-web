# PLAN

## Phrase One -- MVP

目标

- 实现内部管理员账号的注册 (不暴露到公共网页中)
- 实现内部管理员上传帖子 (不暴露到公共网页中)
- 实现帖子的分标签和网页端的正常只读显示
- 阅读量简易记录

不做

- 普通用户注册
- 用户身份认证
- 公网帖子上传功能

> 这个阶段有点像那种学校官网， 只分享， 不互动 (当然我们应该附上简单的联系方式, 也可以附上合理的投稿渠道)

## Phrase Two

目标

- 安全性保障 (https)
- 用户短信注册 (集成服务商的 [短信SDK](https://help.aliyun.com/zh/sms/developer-reference/sdk-product-overview/?spm=a2c4g.11186623.0.0.17a42cc7fXQrjs))
- 密码登录
- 点赞
- 发送评论
