import React, { useEffect, useRef } from "react";
import s from "./MainPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { onEditArticle, onEditCategory } from "../../redux/contentSlice";

export const MainPage = () => {
  const { articles } = useSelector((state) => state.contentReducer);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const article = articles?.find(
    (el) => el.category?.title === params.category && el.title === params.name
  );
  useEffect(() => {
    dispatch(onEditArticle(false));
    dispatch(onEditCategory(false));
    !params.category && navigate("/Main/Main");
  }, [dispatch, navigate, params.category]);

  /*<div dangerouslySetInnerHTML={{ __html: content }} />*/
  /*<div dangerouslySetInnerHTML={{ __html: content }} />*/

  return (
    <article
      className={s.container}
      dangerouslySetInnerHTML={{ __html: article?.content }}
    />
  );
};
