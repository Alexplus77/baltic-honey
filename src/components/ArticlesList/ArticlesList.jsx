import React from "react";
import { Row, Table } from "antd";
import { useSelector } from "react-redux";

export const ArticlesList = () => {
  const { categories } = useSelector((state) => state.contentReducer);

  const columns = [
    {
      title: "BlockMenuName",
      key: "BlockMenuName",
      render: (doc) => <div key={doc._id}>{doc.blockMenuName}</div>,
    },
    {
      title: "Categories",
      key: "Categories",
      render: (doc) =>
        doc.category.map((el) => <div key={el._id}>{el.name}</div>),
    },
    {
      title: "Articles",
      key: "Articles",
      render: ({ category }) =>
        category.map(({ articles }) =>
          articles.map((el) => <div key={el._id}>{el.title}</div>)
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={categories}
    />
  );
};
