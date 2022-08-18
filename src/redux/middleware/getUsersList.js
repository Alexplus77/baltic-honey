import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const sendMail = createAsyncThunk("contentSlice/sendMail", (data) =>
  axios
    .post(`${process.env.REACT_APP_URL}sendMail`, data, {
      headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
      response.status !== 402 && localStorage.removeItem("token");
      return { status: response.status, message: response.data.message };
    })
);
export const editUsersRole = createAsyncThunk(
  "contentSlice/editUsersList",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}editUsersRole`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        response.status !== 402 && localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const removeUsers = createAsyncThunk(
  "contentSlice/removeUsers",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}removeUsers`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        response.status !== 402 && localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const getUsersList = createAsyncThunk("contentSlice/getUsersList", () =>
  axios
    .get(`${process.env.REACT_APP_URL}getUsersList`, {
      headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
      localStorage.removeItem("token");
      return { status: response.status, message: response.data.message };
    })
);
