import React from "react";
import { Table } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { onEditArticle } from "redux/contentSlice";
import { fetchRemoveArticle } from "redux/middleware/articlesPost";
import s from "./ArticlesList.module.css";
export const ArticlesList = () => {
  const dispatch = useDispatch();
  const { categories, articles, content } = useSelector(
    (state) => state.contentReducer
  );
  const handleRemoveArticle = (id) => {
    dispatch(fetchRemoveArticle(id));
  };
  const handleEditOnArticle = (content) => {
    dispatch(onEditArticle(content));
  };

  const columns = [
    {
      title: "Articles",
      key: "Articles",
      render: (doc) => <div key={doc._id}>{doc.title}</div>,
    },
    {
      title: "Categories",
      key: "Categories",
      render: ({ category }) => (
        <div key={category?._id}>{category?.title}</div>
      ),
    },
    {
      title: "BlockMenu",
      key: "BlockMenu",
      render: ({ blockMenu }) => (
        <div key={blockMenu._id}>{blockMenu.title}</div>
      ),
    },
    {
      title: "Actions",
      key: "Actions",
      render: (doc) => (
        <div className={s.actionsBtns}>
          <CloseOutlined
            onClick={() => handleRemoveArticle(doc._id)}
            style={{ color: "red" }}
          />
          <EditOutlined
            onClick={() =>
              handleEditOnArticle({
                id: doc._id,
                title: doc.title,
                content: doc.content,
              })
            }
          />
        </div>
      ),
    },
  ];
  return (
    <Table
      title={() => <h2 className={s.titleTable}>Список статей</h2>}
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={articles}
    />
  );
};
