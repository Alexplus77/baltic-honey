import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Checkbox, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAvatars } from "redux/middleware/userFetch";
import s from "./SelectAvatarModal.module.css";
export const SelectAvatarModal = ({
  isModalAvatarVisible,
  setIsModalAvatarVisible,
  setAvatar,
}) => {
  const { avatarsList } = useSelector((state) => state.contentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvatars());
  }, []);
  const handleOk = (path) => {
    setAvatar(path);
    setIsModalAvatarVisible(false);
  };

  const handleCancel = () => {
    setIsModalAvatarVisible(false);
  };

  return (
    <Modal
      title="Выбор аватарок"
      footer={null}
      visible={isModalAvatarVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className={s.containerAvatars}>
        {avatarsList?.map((avatar) => (
          <div className={s.avatar} key={avatar.name}>
            <img
              onClick={() => handleOk(avatar.path)}
              className={s.image}
              style={{ width: "100px" }}
              src={avatar.path}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};
