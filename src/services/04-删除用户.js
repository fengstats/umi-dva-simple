// 获取用户列表信息
const userList = flow.get('userList');
const params = msg.payload;
// 转换一下,可能变成了字符串
const id = parseInt(msg.req.params.id);

node.warn(`删除用户,id: ${id} 请求参数: ${JSON.stringify(params)}`);

msg.payload = {
  code: 4001,
  data: null,
  msg: 'ID为必传参数，请检查参数传递！',
};
// 必填参数校验
if (!id) {
  return msg;
}

// 查找用户
const user = userList.find((item) => item.id === id);
if (!user) {
  msg.payload.msg = `用户id：${id} 该用户不存在！`;
  return msg;
}

// 编辑操作
const curTime = new Date(+new Date() + 1000 * 60 * 60 * 8).toISOString();
user.isDeleted = 1;
user.updateTime = curTime;

msg.payload = {
  code: 200,
  data: { id },
  msg: '删除用户成功',
};

return msg;
