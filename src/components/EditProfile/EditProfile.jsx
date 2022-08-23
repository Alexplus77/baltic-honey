import React, { useState, useEffect } from "react";
import { Avatar, Button, Form, Input, Modal } from "antd";
import { SelectAvatarModal } from "../SelectAvatarModal";
import s from "./EditProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserAvatar,
  changeUserPassword,
} from "redux/middleware/userFetch";

export const EditProfile = ({ editProfile, setEditProfile }) => {
  const { userData } = useSelector((state) => state.contentReducer);
  const [isModalAvatarVisible, setIsModalAvatarVisible] = useState(false);
  const [avatarPath, setAvatar] = useState(userData?.avatar);

  useEffect(() => {
    setAvatar(userData?.avatar);
  }, [userData?.avatar]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onCancel = () => {
    setEditProfile(false);
  };

  const onFinish = (values) => {
    dispatch(changeUserPassword({ email: userData.email, ...values }));
    setEditProfile(false);
    form.resetFields();
  };
  const handleChangeAvatar = () => {
    dispatch(changeUserAvatar({ email: userData.email, avatar: avatarPath }));
    setEditProfile(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal visible={editProfile} onCancel={onCancel} footer={null}>
      <SelectAvatarModal
        isModalAvatarVisible={isModalAvatarVisible}
        setAvatar={setAvatar}
        setIsModalAvatarVisible={setIsModalAvatarVisible}
      />

      <div className={s.avatarEdit}>
        <Avatar size={"large"} src={avatarPath} />
        <Button type={"primary"} onClick={() => setIsModalAvatarVisible(true)}>
          Выберите аватар
        </Button>
        <Button onClick={handleChangeAvatar} type={"primary"} className={s.btn}>
          Изменить аватар
        </Button>
      </div>

      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Старый пароль"
          name="passwordOld"
          rules={[
            {
              validator(_, value) {
                return !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject("Пароль не должен содержать пробелы");
              },
            },
            {
              required: true,
              message: "Напишите старый пароль!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Новый пароль"
          name="passwordNew"
          rules={[
            {
              min: 6,
              message: "Пароль должен быть не меньше 6 символов",
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("passwordOld") === value) {
                  return Promise.reject(
                    "Прежний и новый пароль не должны совпадать"
                  );
                }
                return !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject("Пароль не должен содержать пробелы");
              },
            }),
            {
              required: true,
              message: "Напишите новый пароль!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Повторите новый пароль"
          dependencies={["passwordNew"]}
          name="passwordNewRepeat"
          rules={[
            ({ getFieldsValue }) => ({
              validator(__, value) {
                if (!value || getFieldsValue().passwordNew === value) {
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
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
