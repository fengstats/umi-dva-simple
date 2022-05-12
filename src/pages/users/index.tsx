import { FC, useRef, useState } from 'react';
import { connect, Dispatch, UserStateType, Loading } from 'umi';
import { Table, Space, Popconfirm, Button, Pagination, message } from 'antd';
import ProTable from '@ant-design/pro-table';

import { SingleUserType } from './data.d';
import { getRemoteList, addRecord, editRecord } from './service';
import UserModal from './components/UserModal';

interface UserPageProps {
  users: UserStateType;
  usersLoading: boolean;
  dispatch: Dispatch;
}

interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

// FC： function components
const UserListPage: FC<UserPageProps> = ({ users, usersLoading, dispatch }) => {
  const tableRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  // 新增/编辑确认Loading
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleUserType | null>(null);

  // console.log('users:', users);
  // console.log('users -> usersLoading:', usersLoading);

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

  // 控制-刷新列表数据
  const reloadHandler = () => {
    tableRef.current.reload();
  };

  // 控制-翻页(页码更新回调函数)
  const onPaginationHandler = (current: number, pageSize: number) => {
    console.log(`current: ${current} pageSize: ${pageSize}`);
    dispatch({
      type: 'users/getData',
      payload: {
        current,
        pageSize,
      },
    });
  };

  // (与dataSource冲突,存在一些问题,所以考虑不使用)请求-用户列表更新
  // const requestHandler = async ({
  //   pageSize,
  //   current,
  // }: {
  //   pageSize: number;
  //   current: number;
  // }) => {
  //   const res = await getRemoteList({ pageSize, current });
  //   const success = res.code === 200 ? true : false;
  //   return {
  //     success,
  //     data: res.data || [],
  //     total: res.pagination.total,
  //   };
  // };

  // 请求-表单-成功的回调 新增/编辑
  const onFinish = async (values: any) => {
    // 打开-确认loading
    setConfirmLoading(true);
    // console.log(record, data);
    let serviceFunc;
    // 默认新增
    let tipText;
    const id = record ? record.id : -999;
    if (id != -999) {
      tipText = '编辑';
      serviceFunc = editRecord;
    } else {
      tipText = '新增';
      serviceFunc = addRecord;
    }
    try {
      const res = await serviceFunc({ id, data: values });
      console.log(res);
      if (res.code == 200) {
        message.success(`用户id：${res.data.id} ${tipText}用户成功！`);
        dispatch({
          type: 'users/getData',
          payload: {
            current: users.pagination.current,
            pageSize: users.pagination.pageSize,
          },
        });
        // 关闭弹框
        handleClose();
        return;
      }
      message.error(res.msg || `${tipText}用户失败！`);
    } catch (error) {
      console.log(`catch ${tipText}:`, error);
    } finally {
      // 关闭确认loading
      setConfirmLoading(false);
    }
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
      {/* <Table
        rowKey="id"
        columns={columns}
        dataSource={users.data}
        loading={usersLoading}
      /> */}
      <ProTable
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={users.data}
        loading={usersLoading}
        // request={requestHandler}
        actionRef={tableRef}
        pagination={false}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAdd}>
            新增用户
          </Button>,
          <Button onClick={reloadHandler}>重新加载</Button>,
        ]}
      />
      <Pagination
        className="list-pagination"
        current={users.pagination.current}
        total={users.pagination.total}
        pageSize={users.pagination.pageSize}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        onChange={onPaginationHandler}
        pageSizeOptions={[5, 8, 12]}
      />
      <UserModal
        visible={visible}
        record={record}
        confirmLoading={confirmLoading}
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
  // console.log('mapStateToProps -> loading:', loading);
  return {
    users,
    usersLoading: loading.models.users,
  };
};

// 将 redux 数据传递给当前组件
export default connect(mapStateToProps)(UserListPage);
