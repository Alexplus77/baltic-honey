import { Button, Modal, Form, Input, Checkbox, Avatar } from "antd";
import React, { useState } from "react";
import { userRegistration } from "redux/middleware/userFetch";
import { SiteRulesModal } from "components/SiteRulesModal";
import { SelectAvatarModal } from "components/SelectAvatarModal";
import { useDispatch } from "react-redux";
import s from "./RegistrationModal.module.css";
import { Link } from "react-router-dom";

export const RegistrationModal = ({ isModalVisible, setIsModalVisible }) => {
  const [confirm, setConfirm] = useState(false);
  const [isModalSiteRules, setIsModalSiteRules] = useState(false);
  const [avatarPath, setAvatar] = useState(
    `${process.env.REACT_APP_URL}avatars/avatarDefault.png`
  );
  const [form2] = Form.useForm();
  const [isModalAvatarVisible, setIsModalAvatarVisible] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    form2.resetFields();
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
    form2.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleConfirm = (e) => {
    setConfirm(e.target.checked);
  };
  return (
    <>
      <SiteRulesModal
        isModalSiteRules={isModalSiteRules}
        setIsModalSiteRules={setIsModalSiteRules}
      />
      <Modal
        footer={null}
        title="Форма регистрации"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <SelectAvatarModal
          isModalAvatarVisible={isModalAvatarVisible}
          setAvatar={setAvatar}
          setIsModalAvatarVisible={setIsModalAvatarVisible}
        />
        <Form
          form={form2}
          name="registration"
          initialValues={{
            remember: false,
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
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                min: 6,
                message: "Пароль должен быть не меньше 6 символов",
              },
              {
                validator(_, value) {
                  return !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject("Пароль не должен содержать пробелы");
                },
              },
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Повторите пароль"
            name="passwordRepeat"
            dependencies={["password"]}
            rules={[
              ({ getFieldsValue }) => ({
                validator(__, value) {
                  if (!value || getFieldsValue().password === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Пароли не совпадают");
                  }
                },
              }),
              {
                required: true,
                message: "Повторите пароль!",
              },
            ]}
            hasFeedback
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
              <a onClick={() => setIsModalSiteRules(true)}>
                С правилами сайта ознакомлен
              </a>{" "}
              и согласен на обработку личных данных
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
    </>
  );
};
