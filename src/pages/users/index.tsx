import { useState } from 'react';
import { connect } from 'umi';
import { Table, Space, Popconfirm, Button } from 'antd';

import UserModal from './components/UserModal';

const users = ({ users, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});

  // console.log('users:', users);

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
          <Popconfirm
            title="是否确认删除该用户信息?"
            onConfirm={() => handleDeleteConfirm(record.id)}
            cancelText="取消"
            okText="确认"
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 控制-编辑弹框
  const handleEdit = (record) => {
    // console.log('handleEdit:', record);
    setRecord(record);
    setVisible(true);
  };

  // 控制-新增弹框
  const handleAdd = () => {
    // TODO: 感觉也可以不清除,后面再看
    setRecord({});
    setVisible(true);
  };

  // 控制-弹框关闭
  const handleClose = () => {
    setVisible(false);
  };

  // 控制-删除-确认
  const handleDeleteConfirm = (id) => {
    console.log('handleDeleteConfirm:', id);
  };

  // 表单-成功的回调
  const onFinish = (data) => {
    // console.log(record, data);
    const id = record.id;
    if (id) {
      // 编辑
      dispatch({
        type: 'users/editUser',
        payload: { id, data },
      });
    } else {
      // 新增
      dispatch({
        type: 'users/addUser',
        payload: { data },
      });
    }
    // 关闭弹框
    handleClose();
  };

  // 表单-失败的回调
  const onFinishFailed = (errorInfo) => {
    console.log('failed:', errorInfo);
  };

  return (
    <div className="list-table">
      <Button type="primary" style={{ margin: '10px 0' }} onClick={handleAdd}>
        新增用户
      </Button>
      <Table rowKey="id" columns={columns} dataSource={users.data} />
      <UserModal
        visible={visible}
        record={record}
        handleClose={handleClose}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
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
