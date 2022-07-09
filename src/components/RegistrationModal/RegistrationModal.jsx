import { Button, Modal, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";

export const RegistrationModal = ({ isModalVisible, setIsModalVisible }) => {
  const [confirm, setConfirm] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    setIsModalVisible(false);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleConfirm = (e) => {
    setConfirm(e.target.checked);
  };
  return (
    <Modal
      footer={null}
      title="Форма регистрации"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
            },
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="passwordRepeat"
          rules={[
            {
              required: true,
              message: "Повторите пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="agreement" valuePropName="checked">
          <Checkbox checked={true} onClick={handleConfirm}>
            С правилами сайта ознакомлен и согласен на обработку личных данных
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button disabled={!confirm} type="primary" htmlType="submit">
            Зарегестрироваться
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
