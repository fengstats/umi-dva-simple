import { connect } from 'umi';
import { Table, Tag, Space } from 'antd';

const users = (props) => {
  const { users } = props;
  // 列表字段定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit &nbsp;&nbsp;</a>
          <a>Delect</a>
        </Space>
      ),
    },
  ];

  console.log('users', users);

  return (
    <div className="list-table">
      <Table columns={columns} dataSource={users.data} />
    </div>
  );
};

// 获取 redux 数据
const mapStateToProps = (state) => {
  // (@@dva, loading, router) 除了users以外的其他参数
  // console.log(rest);
  const { users } = state;
  return { users };
};

// 将 redux 数据传递给当前组件
export default connect(mapStateToProps)(users);
