import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./AdministratorPage.module.css";
import { FormAddCategory } from "components/FormAddCategory";
import { FormAddArticle } from "components/FormAddArticle";
import { Button } from "antd";
import { ArticlesList } from "components/ArticlesList";
import { CategoriesList } from "components/CategoriesList";
import { MediaEditor } from "components/MediaEditor";
import { handleAddCategory, handleAddArticle } from "redux/contentSlice";

export const AdministratorPage = () => {
  const { isAddCategory, isAddArticle } = useSelector(
    (state) => state.contentReducer
  );
  const dispatch = useDispatch();
  return (
    <main>
      <div className={s.cascaderContainer}>
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
        </div>
        <MediaEditor />
        {!isAddArticle && !isAddCategory ? <ArticlesList /> : null}
        {!isAddArticle && !isAddCategory ? <CategoriesList /> : null}
        {isAddCategory && <FormAddCategory />}
        {isAddArticle && <FormAddArticle />}
      </div>
    </main>
  );
};
