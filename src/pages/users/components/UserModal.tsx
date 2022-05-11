import { useEffect } from 'react';
import { Form, Input, Modal, Button } from 'antd';

const UserModal = ({
  record,
  visible,
  handleClose,
  onFinish,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('UserModal -> useEffect:', record);
    // 显示的情况赋值,隐藏的情况重置值
    if (visible) {
      form.setFieldsValue(record);
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
            // rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="状态" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
