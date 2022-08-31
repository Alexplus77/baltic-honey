import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadMedia = createAsyncThunk(
  "contentSlice/uploadMedia",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}uploadMedia`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const getUploadMedia = createAsyncThunk(
  "contentSlice/getUploadMedia",
  () =>
    axios
      .get(`${process.env.REACT_APP_URL}getUploadMedia`)
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const removeUploadMedia = createAsyncThunk(
  "contentSlice/removeUploadMedia",
  (name) =>
    axios
      .get(`${process.env.REACT_APP_URL}removeUploadMedia${name}`, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const fetchPostData = createAsyncThunk(
  "contentSlice/articlesPost",
  ({ category, data }) =>
    axios
      .post(`${process.env.REACT_APP_URL}addArticle`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const fetchRemoveCategory = createAsyncThunk(
  "contentSlice/removeCategory",
  ({ idCategory }) =>
    axios
      .post(
        `${process.env.REACT_APP_URL}removeCategory`,
        { id: idCategory },
        {
          headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
        }
      )
      .then((data) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const fetchUpdateCategory = createAsyncThunk(
  "contentSlice/updateCategory",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}updateCategory`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const fetchAddCategory = createAsyncThunk(
  "contentSlice/addCategory",
  (category) =>
    axios
      .post(`${process.env.REACT_APP_URL}addCategory`, category, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const fetchGetCategories = createAsyncThunk("contentSlice/getData", () =>
  axios
    .get(`${process.env.REACT_APP_URL}getCategories`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      return { status: response.status, message: response.data.message };
    })
);
export const fetchGetArticles = createAsyncThunk(
  "contentSlice/getArticles",
  () =>
    axios
      .get(`${process.env.REACT_APP_URL}getArticles`)
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const fetchGetBlockMenu = createAsyncThunk(
  "contentSlice/getBlockMenu",
  () =>
    axios
      .get(`${process.env.REACT_APP_URL}getBlockMenu`)
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const fetchGetCategoriesMenu = createAsyncThunk(
  "contentSlice/getCategories",
  (id) =>
    axios
      .get(`${process.env.REACT_APP_URL}getCategoriesMenu/${id}`)
      .then(({ data }) => data)
      .catch(({ response }) => {
        return { status: response.status, message: response.data.message };
      })
);
export const fetchRemoveArticle = createAsyncThunk(
  "contentSlice/removeArticle",
  (id) =>
    axios
      .post(
        `${process.env.REACT_APP_URL}removeArticle`,
        { id },
        {
          headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
        }
      )
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
export const fetchUpdateArticle = createAsyncThunk(
  "contentSlice/updateArticle",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}updateArticle`, data, {
        headers: { Authorisation: `Bearer:${localStorage.getItem("token")}` },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        localStorage.removeItem("token");
        return { status: response.status, message: response.data.message };
      })
);
