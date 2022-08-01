import React, { useState, useId } from "react";
import { Avatar, Button, Checkbox, Form, Input, Modal } from "antd";
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
  const [avatarPath, setAvatar] = useState(() => userData?.avatar);

  const dispatch = useDispatch();
  const onCancel = () => {
    setEditProfile(false);
  };

  const onFinish = (values) => {
    dispatch(changeUserPassword({ email: userData.email, ...values }));
    setEditProfile(false);
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
              required: true,
              message: "Напишите старый пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Новый пароль"
          name="passwordNew"
          rules={[
            {
              required: true,
              message: "Напишите новый пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Повторите новый пароль"
          name="passwordNewRepeat"
          rules={[
            {
              required: true,
              message: "Повторите пароль!",
            },
          ]}
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
