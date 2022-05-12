/**
 * 请求参数
 * {number} current  当前页码: 默认1
 * {number} pageSize 每页返回条数: 默认10
 **/
const userList = flow.get('userList');
const params = msg.payload;
let { current = 1, pageSize = 10 } = params;
// 转换成数值类型
current *= 1;
pageSize *= 1;

node.warn(`获取用户列表,请求参数: ${JSON.stringify(params)}`);

// 只要没有被删除的用户就响应给前端就好啦
const renderList = userList.filter((item) => item.isDeleted !== 1);
// 按照创建时间排序一下: 降序排列,升序 rev = 1
const rev = -1;
const key = 'createTime';
const allList = renderList.sort((a, b) =>
  a[key] > b[key] ? rev * 1 : rev * -1,
);
// 获取全部条数
const total = allList.length;

// 根据前端传入的参数分页查询数据
const startIndex = (current - 1) * pageSize;
// slice() 包前不包后
const endIndex = pageSize * current;
const resultList = allList.slice(startIndex, endIndex);

msg.payload = {
  code: 200,
  data: resultList,
  pagination: {
    total,
    pageSize,
    current,
  },
};

// node.warn('获取用户列表');
// node.warn(msg.payload);

return msg;
