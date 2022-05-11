// umi-request 集中错误处理

import { extend } from 'umi-request';
import { notification } from 'antd';

// 状态码对应消息提示
const codeMap = {
  200: '200 服务器成功返回请求的数据',
  201: '201 新建或修改数据成功。',
  202: '202 一个请求已经进入后台排队（异步任务）。',
  204: '204 删除数据成功。',
  400: '400 发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '401 用户没有权限（令牌、用户名、密码错误）。',
  403: '403 用户得到授权，但是访问是被禁止的。',
  404: '404 请求地址不存在',
  406: '406 请求的格式不可得。',
  410: '410 请求的资源被永久删除，且不会再得到的。',
  422: '422 当创建一个对象时，发生一个验证错误。',
  500: '500 服务器发生错误，请检查服务器。',
  502: '502 网关错误。',
  503: '503 服务不可用，服务器暂时过载或维护。',
  504: '504 网关超时。',
};

const errorHandler = ({ response, data }) => {
  console.log('errorHandler data:', data);
  console.log('errorHandler response:', response);
  let errorTitle = '请求错误';
  let errorText = '网络异常，请稍后重试';
  if (response) {
    // console.log('errorHandler url:', response.url);
    // console.log('errorHandler status:', response.status);
    // console.log('errorHandler statusText:', response.statusText);
    // 有响应
    if (response.status) {
      errorText = codeMap[response.status] || response.data;
    }
    return { msg: errorText };
  } else {
    // 无响应
  }
  notification.error({
    message: errorTitle,
    description: errorText,
  });

  // FIXME: (后面再看看这个异常有没有必要抛出?)继续抛出异常
  // throw response;
};

// 创建请求实例
const request = extend({
  errorHandler,
  // 设置超时时间
  timeout: 1000,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});

export default request;
