import { createAsyncThunk } from "@reduxjs/toolkit";
import { Modal } from "antd";
import axios from "axios";

export const changeUserPassword = createAsyncThunk(
  "contentSlice/changeUserPassword",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}changePassword`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        Modal.success({
          title: "Вы успешно изменили пароль!!!",
          content:
            " Ваш логин и новый пароль отправлены на почту указанную при регистрации",
        });
        return data;
      })
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);

export const changeUserAvatar = createAsyncThunk(
  "contentSlice/changeUserAvatar",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}changeAvatar`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const getAvatars = createAsyncThunk("contentSlice/getAvatars", () =>
  axios
    .get(`${process.env.REACT_APP_URL}getAvatars`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      localStorage.removeItem("token");
      return { status: response.status, message: response.data.message };
    })
);
export const userGetData = createAsyncThunk("contentSlice/userGetData", () =>
  axios
    .get(`${process.env.REACT_APP_URL}userGetData`, {
      headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
      localStorage.removeItem("token");
      return { status: response.status, message: response.data.message };
    })
);
export const userAuthentication = createAsyncThunk(
  "contentSlice/userAuthentication",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}authentication`, data)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        return data;
      })
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const userRegistration = createAsyncThunk(
  "contentSlice/userRegistration",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}userRegistration`, data)
      .then(({ data }) => {
        Modal.success({
          title: "Вы успешно зарегестрировались!!!",
          content:
            " Ваш логин и пароль отправлены на почту указанную при регистрации",
        });
        return data;
      })
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
