import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostData,
  fetchAddCategory,
  fetchGetCategories,
  fetchGetArticles,
  fetchGetBlockMenu,
  fetchGetCategoriesMenu,
} from "./middleware/articlesPost";

const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    content: "<p>This is the initial content of the editor.</p>",
    blockMenu: [],
    server: "",
    categories: [],
    toggleEditMod: false,
    articles: [],
    categoriesMenu: [],
  },
  extraReducers: {
    [fetchGetCategoriesMenu.fulfilled]: (state, action) => {
      state.categoriesMenu = action.payload;
    },
    [fetchGetBlockMenu.fulfilled]: (state, action) => {
      state.blockMenu = action.payload;
    },
    [fetchPostData.fulfilled]: (state, action) => {
      state.server = action.payload;
      state.toggleEditMod = !state.toggleEditMod;
    },
    [fetchAddCategory.fulfilled]: (state, action) => {
      state.toggleEditMod = !state.toggleEditMod;
      state.server = action.payload;
    },
    [fetchGetCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.articles = action.payload;
    },
  },
  reducers: {
    addContent: (state, action) => {
      state.content = action.payload;
    },
  },
});
export const { addContent } = contentSlice.actions;
export default contentSlice.reducer;
