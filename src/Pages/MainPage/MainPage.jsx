import React, { useEffect } from "react";
import s from "./MainPage.module.css";
import { useNavigate, useParams, useLocation } from "react-router";
import { fetchGetArticles } from "../../redux/middleware/articlesPost";
import { useSelector, useDispatch } from "react-redux";

export const MainPage = () => {
  const { categories, articles } = useSelector((state) => state.contentReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const article = articles?.find(
    (el) => el.category?.title === params.category && el.title === params.name
  );
  // useEffect(() => {
  //   console.log(!params.category);
  //   !params.category && navigate("/Main/Main");
  // }, []);

  {
    /*<div dangerouslySetInnerHTML={{ __html: content }} />*/
    /*<div dangerouslySetInnerHTML={{ __html: content }} />*/
  }
  return (
    <div
      className={s.container}
      dangerouslySetInnerHTML={{ __html: article?.content }}
    ></div>
  );
};
