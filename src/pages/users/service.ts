// API
import { request } from 'umi';

// 获取用户数据
export const getRemoteList = async () => {
  return request('/api/users', {
    method: 'get',
    // params: { id: 1 },
  });
};

// 新增用户
// data: 单个用户所需的信息
export const addRecord = async ({ data }) => {
  return request(`/api/users`, {
    method: 'post',
    data,
  });
};

// 编辑用户
// id: 用户ID
// data: 单个用户所需的信息
export const editRecord = async ({ id, data }) => {
  return request(`/api/users/${id}`, {
    method: 'put',
    data,
  });
};
