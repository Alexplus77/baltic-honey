import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAvatars = createAsyncThunk("contentSlice/getAvatars", () =>
  axios
    .get(`${process.env.REACT_APP_URL}getAvatars`)
    .then(({ data }) => data)
    .catch(({ response }) => {
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
        console.log(response);
        return { status: response.status, message: response.data.message };
      })
);
export const userRegistration = createAsyncThunk(
  "contentSlice/userRegistration",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}userRegistration`, data)
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
