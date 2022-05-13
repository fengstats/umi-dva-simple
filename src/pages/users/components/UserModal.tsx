import { FC, useEffect } from 'react';
import { Form, Input, Modal, Button, DatePicker, Switch } from 'antd';
import moment from 'moment';

import { SingleUserType } from '@/pages/users/data.d';

interface UserModalProps {
  record: SingleUserType | null;
  visible: boolean;
  confirmLoading: boolean;
  handleClose: () => void;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}

const UserModal: FC<UserModalProps> = ({
  record,
  visible,
  confirmLoading,
  handleClose,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log('UserModal -> useEffect:', record);
    // 显示的情况赋值,隐藏的情况重置值
    if (visible) {
      form.setFieldsValue({
        ...record,
        createTime: moment(record?.createTime),
        status: record?.status ? true : false,
      });
    } else {
      form.resetFields();
    }
  }, [visible]);

  // 提交表单数据
  const onSubmit = () => {
    // console.log('提交表单数据:', form);
    form.submit();
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={onSubmit}
        onCancel={handleClose}
        // 强制渲染
        forceRender
      >
        {/* {JSON.stringify(record)} */}
        {/* initialValues: 只有初始化以及重置时生效,不能被 setState 动态更新,需要使用 setFieldsValue 更新 */}
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="名称"
            name="name"
            // 校验规则
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入用户邮箱" />
          </Form.Item>
          <Form.Item label="时间" name="createTime">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
