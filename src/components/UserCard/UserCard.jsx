import { Avatar, Card, Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./UserCard.module.css";
import { logOut } from "redux/contentSlice";

const { Meta } = Card;
export const UserCard = () => {
  const { isAuth, userData } = useSelector((state) => state.contentReducer);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
  };
  return (
    <Card className={s.container}>
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

      <div className={s.btnContainer}>
        <Button onClick={handleLogOut} className={s.btn} type={"primary"}>
          Logout
        </Button>
      </div>
    </Card>
  );
};
