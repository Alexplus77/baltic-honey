import { Avatar, Card, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditProfile } from "components/EditProfile";
import s from "./UserCard.module.css";
import { logOut } from "redux/contentSlice";

const { Meta } = Card;
export const UserCard = () => {
  const { userData } = useSelector((state) => state.contentReducer);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
  };
  const handleEditProfile = () => {
    setEditProfile(true);
  };
  return (
    <>
      <EditProfile editProfile={editProfile} setEditProfile={setEditProfile} />
      <Card
        className={s.container}
        actions={[
          <SettingOutlined onClick={handleEditProfile} key={"setting"} />,
          <Button
            key={"logout"}
            onClick={handleLogOut}
            className={s.btn}
            type={"primary"}
          >
            Logout
          </Button>,
        ]}
      >
        <Meta
          avatar={
            <Avatar
              size={"large"}
              src={userData?.avatar || "https://joeschmoe.io/api/v1/random"}
            />
          }
          title={userData?.email}
        />

        <div className={s.meta}>
          <Meta title={userData?.role} />
        </div>
      </Card>
    </>
  );
};
