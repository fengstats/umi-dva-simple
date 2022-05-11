const userList = flow.get('userList');

// 只要没有被删除的用户就响应给前端就好啦
const renderList = userList.filter((item) => item.isDeleted !== 1);
// 按照创建时间排序一下: 降序排列,升序 rev = 1
const rev = -1;
const key = 'createTime';
const resultList = renderList.sort((a, b) =>
  a[key] > b[key] ? rev * 1 : rev * -1,
);

msg.payload = {
  code: 200,
  data: resultList,
  meta: {
    total: 0,
    perPage: 5,
    page: 1,
  },
};

node.warn('获取用户列表');
node.warn(msg.payload);

return msg;
