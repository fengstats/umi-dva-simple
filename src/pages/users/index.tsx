import { useState } from 'react';
import { connect } from 'umi';
import { Table, Space } from 'antd';

import UserModal from './components/UserModal';

const users = ({ users }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});

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
      // record: 当前行数据
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a style={{ color: 'red' }}>删除</a>
        </Space>
      ),
    },
  ];

  // 控制-编辑弹框
  const handleEdit = (record) => {
    console.log('record =>', record);
    setRecord(record);
    setVisible(true);
  };

  // 控制-弹框关闭
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="list-table">
      <Table rowKey="id" columns={columns} dataSource={users.data} />
      <UserModal visible={visible} handleClose={handleClose} record={record} />
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
