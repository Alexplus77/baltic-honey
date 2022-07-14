import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostData,
  fetchAddCategory,
  fetchUpdateCategory,
  fetchRemoveCategory,
  fetchGetCategories,
  fetchGetArticles,
  fetchGetBlockMenu,
  fetchGetCategoriesMenu,
  fetchRemoveArticle,
  fetchUpdateArticle,
  uploadMedia,
  getUploadMedia,
  removeUploadMedia,
} from "./middleware/articlesPost";
import {
  userRegistration,
  userAuthentication,
  userGetData,
} from "./middleware/userFetch";
//ok
const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    content: "",
    blockMenu: [],
    server: "",
    categories: [],
    toggleEditMod: false,
    articles: [],
    categoriesMenu: [],
    editArticle: false,
    editCategory: false,
    isAddCategory: false,
    isAddArticle: false,
    uploadMediaItems: [],
    error: "",
    isAuth: false,
    userData: null,
  },
  extraReducers: {
    [userGetData.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.userData = action.payload;
      }
    },
    [userAuthentication.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    [userRegistration.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
      }
    },
    [uploadMedia.fulfilled]: (state, action) => {
      if (action.payload.status) {
        state.error = action.payload;
      } else {
        state.uploadMediaItems = action.payload;
        state.error = null;
      }
    },
    [removeUploadMedia.fulfilled]: (state, action) => {
      if (action.payload.status) {
        state.error = action.payload;
      } else {
        state.uploadMediaItems = action.payload;
        state.error = null;
      }
    },
    [getUploadMedia.fulfilled]: (state, action) => {
      if (action.payload.status) {
        state.error = action.payload;
      } else {
        state.uploadMediaItems = action.payload;
      }
    },
    [fetchUpdateArticle.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.toggleEditMod = !state.toggleEditMod;
        state.editArticle = null;
        state.isAddArticle = false;
      }
    },
    [fetchRemoveArticle.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.toggleEditMod = !state.toggleEditMod;
      }
    },
    [fetchGetCategoriesMenu.fulfilled]: (state, action) => {
      state.categoriesMenu = action.payload;
    },
    [fetchGetBlockMenu.fulfilled]: (state, action) => {
      state.blockMenu = action.payload;
    },
    [fetchPostData.fulfilled]: (state, action) => {
      state.server = action.payload;
      state.toggleEditMod = !state.toggleEditMod;
      state.isAddArticle = false;
    },
    [fetchAddCategory.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.toggleEditMod = !state.toggleEditMod;
        state.server = action.payload;
        state.isAddCategory = false;
      }
    },
    [fetchUpdateCategory.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.toggleEditMod = !state.toggleEditMod;
        state.editCategory = null;
        state.isAddCategory = false;
      }
    },
    [fetchRemoveCategory.fulfilled]: (state, action) => {
      if (action.payload?.status) {
        state.error = action.payload;
        state.isAuth = false;
      } else {
        state.toggleEditMod = !state.toggleEditMod;
      }
    },
    [fetchGetCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.articles = action.payload;
    },
  },
  reducers: {
    exitErrorMod: (state) => {
      state.error = null;
    },
    onErrorMod: (state, action) => {
      state.error = action.payload;
    },
    handleAddCategory: (state) => {
      state.isAddCategory = !state.isAddCategory;
      state.isAddArticle = false;
    },
    handleAddArticle: (state) => {
      state.isAddArticle = !state.isAddArticle;
      state.isAddCategory = false;
    },
    addContent: (state, action) => {
      state.content = action.payload;
    },
    onEditArticle: (state, action) => {
      state.isAddArticle = true;
      state.editArticle = {
        id: action.payload.id,
        title: action.payload.title,
      };
      state.content = action.payload.content;
    },
    onEditCategory: (state, action) => {
      state.isAddCategory = true;
      state.editCategory = action.payload;
    },
  },
});
export const {
  addContent,
  onEditArticle,
  onEditCategory,
  handleAddCategory,
  handleAddArticle,
  exitErrorMod,
  onErrorMod,
} = contentSlice.actions;
export default contentSlice.reducer;
