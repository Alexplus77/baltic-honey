import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPostData = createAsyncThunk(
  "contentSlice/articlesPost",
  ({ category, data }) =>
    axios
      .post(`http://localhost:8080/addArticle`, data)
      .then(({ data }) => data)
);
export const fetchRemoveCategory = createAsyncThunk(
  "contentSlice/removeCategory",
  ({ idCategory }) => {
    axios
      .post(`http://localhost:8080/removeCategory`, { id: idCategory })
      .then((data) => data);
  }
);
export const fetchUpdateCategory = createAsyncThunk(
  "contentSlice/updateCategory",
  (data) => {
    axios
      .post("http://localhost:8080/updateCategory", data)
      .then(({ data }) => data);
  }
);
export const fetchAddCategory = createAsyncThunk(
  "contentSlice/addCategory",
  (category) =>
    axios
      .post(`http://localhost:8080/addCategory`, category)
      .then(({ data }) => data)
);
export const fetchGetCategories = createAsyncThunk("contentSlice/getData", () =>
  axios.get(`http://localhost:8080/getCategories`).then(({ data }) => data)
);
export const fetchGetArticles = createAsyncThunk(
  "contentSlice/getArticles",
  (params) =>
    axios.get(`http://localhost:8080/getArticles`).then(({ data }) => data)
);
export const fetchGetBlockMenu = createAsyncThunk(
  "contentSlice/getBlockMenu",
  () => axios.get(`http://localhost:8080/getBlockMenu`).then(({ data }) => data)
);
export const fetchGetCategoriesMenu = createAsyncThunk(
  "contentSlice/getCategories",
  (id) =>
    axios
      .get(`http://localhost:8080/getCategoriesMenu/${id}`)
      .then(({ data }) => data)
);
export const fetchRemoveArticle = createAsyncThunk(
  "contentSlice/removeArticle",
  (id) =>
    axios
      .post("http://localhost:8080/removeArticle", { id })
      .then(({ data }) => data)
);
export const fetchUpdateArticle = createAsyncThunk(
  "contentSlice/updateArticle",
  (data) => {
    axios
      .post("http://localhost:8080/updateArticle", data)
      .then(({ data }) => data);
  }
);
