import { Button, Checkbox, Form, Input } from "antd";
import { RegistrationModal } from "../RegistrationModal";
import React from "react";
import s from "./LogInCard.module.css";
import { useState } from "react";
export const LogInCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={s.container}>
      <RegistrationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Form
        size={"small"}
        className={s.formLogIn}
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
          label="Password"
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
        <Form.Item>
          <div className={s.btnsGroup}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Зарегестрироваться
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
