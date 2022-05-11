// 约定式的 model 组织方式,不用手动注册 model
import { Reducer, Effect, Subscription } from 'umi';

import { getRemoteList } from './service';

// 类型定义
interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {};
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  // model命名空间
  namespace: 'users',

  // 数据源
  state: {},

  // 同步函数
  reducers: {
    getList(state, action) {
      console.log('reducers getList action =>', action);
      return action.payload;
    },
  },

  // 异步函数: 生成器函数
  effects: {
    // 第一个参数: action {type: "派发类型: 一般不用", payload: "派发数据"}
    // 第二个参数: effects { put: "用于传递 reducers 的数据的函数", call: "请求数据使用" }
    *getRemote(action, { put, call }) {
      const res = yield call(getRemoteList);

      // console.log('getRemote', res);

      yield put({
        type: 'getList',
        payload: {
          data: res.data,
        },
      });
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      // TODO: return 的作用尚不明确
      return history.listen(({ pathname }) => {
        console.log('history listen pathname =>', pathname);
        if (pathname === '/users') {
          // 分派给 effects
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default UserModel;
