// API
import { request } from 'umi';

// 获取用户数据
export const getRemoteList = async () => {
  return request('/api/users', {
    method: 'get',
    params: { id: 1 },
  });
};
