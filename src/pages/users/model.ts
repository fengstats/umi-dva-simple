// 约定式的 model 组织方式,不用手动注册 model
import { Reducer, Effect, Subscription } from 'umi';
import { message } from 'antd';

import { getRemoteList, addRecord, editRecord, delRecord } from './service';

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
      console.log('reducers -> getList:', action.payload);
      return action.payload;
    },
  },

  // 异步函数: 生成器函数
  effects: {
    // 第一个参数: action {type: "派发类型: 一般不用", payload: "派发数据"}
    // 第二个参数: effects { put: "用于传递 reducers 的数据的函数", call: "请求数据使用" }
    *getRemote(action, { put, call }) {
      // TODO: 后续看看这个 try {} catch {} 如何更优雅的使用
      try {
        const res = yield call(getRemoteList);
        // console.log('getRemote', res);
        if (res?.code === 200) {
          yield put({
            type: 'getList',
            payload: { data: res.data },
          });
        }
      } catch (error) {
        console.log('catch getRemote:', error);
      }
    },

    // 新增用户
    *addUser({ payload }, { put, call }) {
      try {
        const res = yield call(addRecord, payload);
        console.log(res);
        if (res.code === 200) {
          message.success(`用户id：${res.data.id} 新增用户成功！`);
          yield put({
            type: 'getRemote',
          });
        } else {
          message.error(res.msg || '新增用户失败！');
        }
      } catch (error) {
        console.log('catch editUser:', error);
      }
    },

    // 编辑用户
    *editUser({ payload }, { put, call }) {
      // console.log('editUser here', payload);
      try {
        const res = yield call(editRecord, payload);
        console.log(res);
        if (res?.code === 200) {
          message.success(`用户id：${res.data.id} 编辑用户成功！`);
          yield put({
            type: 'getRemote',
          });
        } else {
          message.error(res.msg || '编辑用户失败！');
        }
      } catch (error) {
        console.log('catch editUser:', error);
      }
    },

    // 删除用户
    *delUser({ payload }, { put, call }) {
      try {
        const res = yield call(delRecord, payload);
        console.log(res);
        if (res?.code === 200) {
          message.success(`用户id：${res.data.id} 删除用户成功！`);
          yield put({
            type: 'getRemote',
          });
        } else {
          message.error(res.msg || '删除用户失败！');
        }
      } catch (error) {
        console.log('catch delUser:', error);
      }
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      // TODO: return 的作用尚不明确
      return history.listen(({ pathname }) => {
        // console.log('subscriptions -> pathname:', pathname);
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
