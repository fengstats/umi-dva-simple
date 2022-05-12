# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 用户目录规划

### users

- index.tsx
- model.ts(妈斗)
- service.ts
- components/UserModal.tsx(摸斗)

## Dva

### 数据流概念

- 公共数据
- 私有数据
- 同步数据: Reducer 更改 state 的唯一渠道
- 异步数据: Effect

Redux Store State -> Model

- Subscription: 页面层级, 订阅
- 页面可以直接通过 connect 调用 Reducer 更改 state
- 也可以通过 dispatch(派发) Effect -> Reducer, 通过`put`函数
- Subscription 也可以通过 dispatch(派发) Effect

Effect 拆分

- Service: 服务

## antd

### Form

- initialValues: 只有初始化以及重置时生效,不能被 setState 动态更新,需要使用 setFieldsValue 更新

## proTable

```shell
npm i @ant-design/pro-table --save
# 或者
yarn add @ant-design/pro-table --save
```