import React, { useEffect } from "react";
import s from "./UserManagementPage.module.css";
import { UsersList } from "components/UsersList";
import { getUsersList } from "redux/middleware/getUsersList";
import { useDispatch } from "react-redux";
import { FormOrder } from "components/FormOrder";

export const UserManagementPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList());
  }, []);
  return (
    <main>
      {/*<FormOrder />*/}
      <UsersList />
    </main>
  );
};
