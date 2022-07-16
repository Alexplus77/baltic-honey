import { Button, Modal, Form, Input, Checkbox, Avatar } from "antd";
import React, { useState } from "react";
import { userRegistration } from "redux/middleware/userFetch";
import { SelectAvatarModal } from "components/SelectAvatarModal";
import { useDispatch } from "react-redux";
import s from "./RegistrationModal.module.css";
export const RegistrationModal = ({ isModalVisible, setIsModalVisible }) => {
  const [confirm, setConfirm] = useState(false);
  const [avatarPath, setAvatar] = useState(
    "https://joeschmoe.io/api/v1/random"
  );
  const [isModalAvatarVisible, setIsModalAvatarVisible] = useState(false);
  const dispatch = useDispatch();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    dispatch(
      userRegistration({
        email: values.email,
        password: values.password,
        agreementMailing: values.agreementMailing,
        avatar: avatarPath,
      })
    );
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
      <SelectAvatarModal
        isModalAvatarVisible={isModalAvatarVisible}
        setAvatar={setAvatar}
        setIsModalAvatarVisible={setIsModalAvatarVisible}
      />
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className={s.selectAvatar}>
          <Avatar size={"large"} src={avatarPath} />
          <Button onClick={() => setIsModalAvatarVisible(true)}>
            Выберите аватар
          </Button>
        </div>

        <Form.Item
          name={"email"}
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
        <Form.Item name="agreementMailing" valuePropName="checked">
          <Checkbox>
            Хочу принимать рассылку с последними новостями и предложениями.
          </Checkbox>
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
