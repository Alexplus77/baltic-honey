import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import s from "./FormAddArticle.module.css";
import { EditorText } from "components/EditorText";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCategoriesMenu,
  fetchPostData,
} from "../../redux/middleware/articlesPost";
import { addContent } from "../../redux/contentSlice";

export const FormAddArticle = () => {
  const dispatch = useDispatch();
  const { content, categories, blockMenu, categoriesMenu } = useSelector(
    (state) => state.contentReducer
  );

  const onFinish = (values) => {
    //console.log("values", { ...values, content: content });

    content.trim()
      ? dispatch(
          fetchPostData({
            data: { ...values, content: content },
          })
        )
      : console.log("Ошибка: Добавьте содержимое статьи!!!");

    dispatch(addContent(""));
  };
  const handleSelectBlock = (value) => {
    dispatch(fetchGetCategoriesMenu(value));
  };

  return (
    <Form onFinish={onFinish} name={"addArticleForm"} className={s.form}>
      <Form.Item
        name={"blockMenu"}
        className={s.select}
        label={"Выберите блок меню"}
        rules={[
          {
            required: true,
            message: "Выберите блок меню!",
          },
        ]}
      >
        <Select onChange={handleSelectBlock} placeholder={"Выберите блок меню"}>
          {blockMenu?.map((block) => (
            <Select.Option key={block._id}>{block.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={"category"}
        className={s.select}
        label={"Выберите раздел"}
        rules={[
          {
            required: true,
            message: "Выберите раздел!",
          },
        ]}
      >
        <Select placeholder={"Выберите категорию"}>
          {categoriesMenu?.map((category) => (
            <Select.Option key={category._id}>{category.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Укажите название статьи!",
          },
        ]}
        name={"title"}
        className={s.input}
        label={"Название статьи"}
      >
        <Input />
      </Form.Item>
      <EditorText />
      <Form.Item className={s.button}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Сохранить статью
        </Button>
      </Form.Item>
    </Form>
  );
};
