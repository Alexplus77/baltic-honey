import { Button, Modal, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";

export const RegistrationModal = ({ isModalVisible, setIsModalVisible }) => {
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
          label="Логин"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
          <Checkbox checked={true}>
            С правилами сайта ознакомлен и согласен на обработку личных данных
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Зарегестрироваться
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
