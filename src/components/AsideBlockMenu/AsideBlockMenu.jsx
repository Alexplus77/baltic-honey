import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./AsideBlockMenu.module.css";
import { useSelector } from "react-redux";

export const AsideBlockMenu = ({ item }) => {
  const { articles } = useSelector((state) => state.contentReducer);

  const articlesList = articles?.filter((el) => el.category?._id === item?._id);
  return (
    <div className={s.container}>
      <h3>{item.title}</h3>
      <ul>
        {articlesList?.map((el) => (
          <li key={el._id}>
            <Link to={`/${item.title}/${el.title}`}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
