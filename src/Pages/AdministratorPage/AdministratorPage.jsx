import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import s from "./AdministratorPage.module.css";
import { FormAddCategory } from "components/FormAddCategory";
import { FormAddArticle } from "components/FormAddArticle";
import { Button } from "antd";
import { ArticlesList } from "components/ArticlesList";
import { CategoriesList } from "components/CategoriesList";
import { MediaEditor } from "components/MediaEditor";
import { handleAddCategory, handleAddArticle } from "redux/contentSlice";
import {
  getUploadMedia,
  uploadMedia,
  getUploadedSliderImages,
  uploadSliderMedia,
} from "redux/middleware/articlesPost";

export const AdministratorPage = () => {
  const [modMedia, setModMedia] = useState("mediaContent");
  const { isAddCategory, isAddArticle } = useSelector(
    (state) => state.contentReducer
  );
  const dispatch = useDispatch();
  return (
    <main>
      <div className={s.cascaderContainer}>
        <Button className={s.btnUserManagement} type={"primary"}>
          <Link to={"/userManagement"}> Управление пользователями</Link>
        </Button>
        <h1>Панель управления контентом</h1>
        <div className={s.btnsContainer}>
          <Button
            onClick={() => dispatch(handleAddCategory())}
            type={"primary"}
          >
            Добавить категорию в меню
          </Button>
          <Button onClick={() => dispatch(handleAddArticle())} type={"primary"}>
            Добавить статью
          </Button>
          <Button onClick={() => setModMedia("mediaContent")} type={"primary"}>
            Управление изображениями контента
          </Button>
          <Button onClick={() => setModMedia("mediaSlider")} type={"primary"}>
            Управление изображениями слайдера
          </Button>
        </div>
        <h3>Управление медиа: {modMedia}</h3>
        <MediaEditor
          getUploadedImages={
            modMedia === "mediaSlider"
              ? getUploadedSliderImages
              : getUploadMedia
          }
          uploadImage={
            modMedia === "mediaSlider" ? uploadSliderMedia : uploadMedia
          }
        />
        {!isAddArticle && !isAddCategory ? <ArticlesList /> : null}
        {!isAddArticle && !isAddCategory ? <CategoriesList /> : null}
        {isAddCategory && <FormAddCategory />}
        {isAddArticle && <FormAddArticle />}
      </div>
    </main>
  );
};
