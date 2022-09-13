import React from "react";
import { Link } from "react-router-dom";
import s from "./AsideBlockMenu.module.css";
import { useSelector } from "react-redux";
import { Collapse } from "antd";

export const AsideBlockMenu = ({ item }) => {
  const { articles } = useSelector((state) => state.contentReducer);

  const articlesList = articles?.filter((el) => el.category?._id === item?._id);

  return (
    <Collapse>
      <Collapse.Panel
        className={s.container}
        key={item.title}
        header={item.title}
      >
        <div className={s.articlesList}>
          {articlesList?.map((el) => (
            <Link
              //style={{ color: "black" }}
              className={s.Link}
              key={el._id}
              to={`/${item.title}/${el.title}`}
            >
              {el.title}
            </Link>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
    // <div className={s.container}>
    //   <h3>{item.title}</h3>
    //   <ul>
    //     {articlesList?.map((el) => (
    //       <li key={el._id}>
    //         <Link to={`/${item.title}/${el.title}`}>{el.title}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};
