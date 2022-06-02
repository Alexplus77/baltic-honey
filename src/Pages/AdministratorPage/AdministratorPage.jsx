import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./AdministratorPage.module.css";
import { FormAddCategory } from "components/FormAddCategory";
import { FormAddArticle } from "components/FormAddArticle";
import { Button, Cascader } from "antd";
import { ArticlesList } from "components/ArticlesList";

export const AdministratorPage = () => {
  const onChange = (value) => {};
  const { categories } = useSelector((state) => state.contentReducer);

  return (
    <main>
      <div className={s.cascaderContainer}>
        {/*<div dangerouslySetInnerHTML={{ __html: content }} />*/}
        <h1>Панель управления контентом</h1>
        <div className={s.btnsContainer}>
          <Button type={"primary"}>Добавить раздел в боковое меню</Button>
          <Button type={"primary"}>Добавить статью</Button>
        </div>
        <ArticlesList />
        <FormAddCategory />
        <FormAddArticle />
      </div>
    </main>
  );
};
