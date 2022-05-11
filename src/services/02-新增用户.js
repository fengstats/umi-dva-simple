// 获取全局控制id
const id = flow.get('id') + 1;
// 获取用户列表信息
const userList = flow.get('userList');
const params = msg.payload;
const { name, email = '', status = 1 } = params;

node.warn(`新增用户列表,请求参数: ${JSON.stringify(params)}`);

// 必填参数校验
if (!name) {
  msg.payload = {
    code: 4001,
    data: null,
    msg: '名称为必传参数，请检查！',
  };
  return msg;
}

// UTC时区需要+8小时才能与北京时间相等
const curTime = new Date(+new Date() + 1000 * 60 * 60 * 8).toISOString();
// 新增操作
userList.push({
  id,
  name,
  email,
  status,
  // 软删除标记
  isDeleted: 0,
  createTime: curTime,
  updateTime: curTime,
});

// 全局id++
flow.set('id', id);
msg.payload = {
  code: 200,
  data: { id },
  msg: '新增用户成功',
};

return msg;
