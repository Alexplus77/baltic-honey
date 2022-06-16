import React from "react";
import { Table } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import s from "./CategoriesList.module.css";
import { onEditCategory } from "redux/contentSlice";

export const CategoriesList = () => {
  const { categories, articles, content } = useSelector(
    (state) => state.contentReducer
  );
  const dispatch = useDispatch();
  console.log(categories);
  const handleEditOnCategory = (data) => {
    dispatch(onEditCategory(data));
  };
  const columns = [
    {
      title: "Categories",
      key: "categories",
      render: (doc) => <div key={doc._id}>{doc.title}</div>,
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
            //onClick={() => handleRemoveArticle(doc._id)}
            style={{ color: "red" }}
          />
          <EditOutlined
          // onClick={() =>
          //     handleEditOnArticle({
          //       id: doc._id,
          //       title: doc.title,
          //       content: doc.content,
          //     })
          // }
          />
        </div>
      ),
    },
  ];
  return (
    <Table
      title={() => <h2 className={s.titleTable}>Список категорий меню</h2>}
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={categories}
    />
  );
};
