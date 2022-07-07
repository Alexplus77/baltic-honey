import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadMedia = createAsyncThunk(
  "contentSlice/uploadMedia",
  (data) =>
    axios
      .post(`${process.env.REACT_APP_URL}uploadMedia`, data)
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
      .catch((e) => e)
);
export const removeUploadMedia = createAsyncThunk(
  "contentSlice/removeUploadMedia",
  (name) =>
    axios
      .get(`${process.env.REACT_APP_URL}removeUploadMedia${name}`)
      .then(({ data }) => data)
);
export const fetchPostData = createAsyncThunk(
  "contentSlice/articlesPost",
  ({ category, data }) =>
    axios
      .post(`${process.env.REACT_APP_URL}addArticle`, data)
      .then(({ data }) => data)
);
export const fetchRemoveCategory = createAsyncThunk(
  "contentSlice/removeCategory",
  ({ idCategory }) => {
    axios
      .post(`${process.env.REACT_APP_URL}removeCategory`, { id: idCategory })
      .then((data) => data);
  }
);
export const fetchUpdateCategory = createAsyncThunk(
  "contentSlice/updateCategory",
  (data) => {
    axios
      .post(`${process.env.REACT_APP_URL}updateCategory`, data)
      .then(({ data }) => data);
  }
);
export const fetchAddCategory = createAsyncThunk(
  "contentSlice/addCategory",
  (category) =>
    axios
      .post(`${process.env.REACT_APP_URL}addCategory`, category)
      .then(({ data }) => data)
);
export const fetchGetCategories = createAsyncThunk("contentSlice/getData", () =>
  axios
    .get(`${process.env.REACT_APP_URL}getCategories`)
    .then(({ data }) => data)
);
export const fetchGetArticles = createAsyncThunk(
  "contentSlice/getArticles",
  (params) =>
    axios
      .get(`${process.env.REACT_APP_URL}getArticles`)
      .then(({ data }) => data)
);
export const fetchGetBlockMenu = createAsyncThunk(
  "contentSlice/getBlockMenu",
  () =>
    axios
      .get(`${process.env.REACT_APP_URL}getBlockMenu`)
      .then(({ data }) => data)
);
export const fetchGetCategoriesMenu = createAsyncThunk(
  "contentSlice/getCategories",
  (id) =>
    axios
      .get(`${process.env.REACT_APP_URL}getCategoriesMenu/${id}`)
      .then(({ data }) => data)
);
export const fetchRemoveArticle = createAsyncThunk(
  "contentSlice/removeArticle",
  (id) =>
    axios
      .post(`${process.env.REACT_APP_URL}removeArticle`, { id })
      .then(({ data }) => data)
);
export const fetchUpdateArticle = createAsyncThunk(
  "contentSlice/updateArticle",
  (data) => {
    axios
      .post(`${process.env.REACT_APP_URL}updateArticle`, data)
      .then(({ data }) => data);
  }
);
