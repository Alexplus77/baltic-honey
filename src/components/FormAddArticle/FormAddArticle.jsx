import React, { useEffect, useRef } from "react";
import { Form, Input, Select, Button } from "antd";
import s from "./FormAddArticle.module.css";
import { EditorText } from "components/EditorText";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCategoriesMenu,
  fetchPostData,
  fetchUpdateArticle,
} from "redux/middleware/articlesPost";
import { addContent } from "redux/contentSlice";

export const FormAddArticle = () => {
  const dispatch = useDispatch();
  const { content, editArticle, blockMenu, categoriesMenu } = useSelector(
    (state) => state.contentReducer
  );
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //console.log("values", { ...values, content: content });
    content.trim()
      ? editArticle?.title
        ? dispatch(
            fetchUpdateArticle({
              id: editArticle?.id,
              title: values.title,
              content: content,
            })
          )
        : dispatch(
            fetchPostData({
              data: { ...values, content: content },
            })
          )
      : console.log("Ошибка: Добавьте содержимое статьи!!!");
    form.resetFields();
    dispatch(addContent(""));
  };
  const handleSelectBlock = (value) => {
    dispatch(fetchGetCategoriesMenu(value));
  };

  return (
    <Form onFinish={onFinish} name={"addArticleForm"} className={s.form}>
      <Form.Item
        hidden={editArticle?.title}
        name={"blockMenu"}
        className={s.select}
        label={"Выберите блок меню"}
        rules={[
          {
            required: !editArticle?.title && true,
            message: "Выберите блок меню!",
          },
        ]}
        initialValue={{ title: editArticle?.title }}
      >
        <Select onChange={handleSelectBlock} placeholder={"Выберите блок меню"}>
          {blockMenu?.map((block) => (
            <Select.Option key={block._id}>{block.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        hidden={editArticle}
        name={"category"}
        className={s.select}
        label={"Выберите раздел"}
        rules={[
          {
            required: !editArticle?.title && true,
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
        initialValue={editArticle?.title}
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
