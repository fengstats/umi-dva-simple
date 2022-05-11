import { FC, useState } from 'react';
import { connect, Dispatch, UserStateType, Loading } from 'umi';
import { Table, Space, Popconfirm, Button } from 'antd';

import { SingleUserType } from './data.d';
import UserModal from './components/UserModal';

interface UserPageProps {
  users: UserStateType;
  usersLoading: boolean;
  dispatch: Dispatch;
}

// FC： function components
const UserListPage: FC<UserPageProps> = ({ users, usersLoading, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | null>(null);

  // console.log('users:', users);
  console.log('users -> usersLoading:', usersLoading);

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
      width: '150px',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      // record: 当前行数据
      render: (text: string, record: SingleUserType) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="是否删除该用户？"
            onConfirm={() => onDeleteConfirm(record.id)}
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
  const handleEdit = (record: SingleUserType) => {
    // console.log('handleEdit:', record);
    setRecord(record);
    setVisible(true);
  };

  // 控制-新增弹框
  const handleAdd = () => {
    // TODO: 感觉也可以不清除,后面再看
    setRecord(null);
    setVisible(true);
  };

  // 控制-弹框关闭
  const handleClose = () => {
    setVisible(false);
  };

  // 请求-表单-成功的回调 新增/编辑
  const onFinish = (values: any) => {
    // console.log(record, data);
    const id = record ? record.id : -999;
    if (id) {
      // 编辑
      dispatch({
        type: 'users/edit',
        payload: { id, data: values },
      });
    } else {
      // 新增
      dispatch({
        type: 'users/add',
        payload: { data: values },
      });
    }
    // 关闭弹框
    handleClose();
  };

  // 请求-确认删除
  const onDeleteConfirm = (id: number) => {
    // console.log('onDeleteConfirm:', id);
    dispatch({
      type: 'users/delete',
      payload: { id },
    });
  };

  // 表单-失败的回调
  const onFinishFailed = (errorInfo: any) => {
    console.log('failed:', errorInfo);
  };

  return (
    <div className="list-table">
      <Button type="primary" style={{ margin: '10px 0' }} onClick={handleAdd}>
        新增用户
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users.data}
        loading={usersLoading}
      />
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
const mapStateToProps = (state: { users: UserStateType; loading: Loading }) => {
  const { users, loading } = state;
  // TODO: 这个 loading 中的 users 我目前猜测是 effects 函数调用后更改为 true,处理完成更改为 false
  console.log('mapStateToProps -> loading:', loading);
  return {
    users,
    usersLoading: loading.models.users,
  };
};

// 将 redux 数据传递给当前组件
export default connect(mapStateToProps)(UserListPage);
