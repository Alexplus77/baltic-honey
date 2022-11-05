import React, { useEffect } from "react";
import s from "./UserManagementPage.module.css";
import { UsersList } from "components/UsersList";
import { getUsersList } from "redux/middleware/getUsersList";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { FormOrder } from "components/FormOrder";

export const UserManagementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList());
  }, []);
  return (
    <section className={s.container}>
      {/*<FormOrder />*/}
      <UsersList />
      <Button className={s.btn} type={"primary"} onClick={() => navigate(-1)}>
        Назад
      </Button>
    </section>
  );
};
