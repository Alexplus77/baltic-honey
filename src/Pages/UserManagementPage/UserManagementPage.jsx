import React, { useEffect } from "react";
import s from "./UserManagementPage.module.css";
import { UsersList } from "components/UsersList";
import { getUsersList } from "redux/middleware/getUsersList";
import { useDispatch } from "react-redux";

export const UserManagementPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList());
  }, []);
  return (
    <main>
      <UsersList />
    </main>
  );
};
