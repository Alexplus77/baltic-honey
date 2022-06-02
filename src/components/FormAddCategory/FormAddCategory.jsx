import React from "react";
import { Form, Select, Button, Input } from "antd";
import s from "./FormAddCategory.module.css";
import { fetchAddCategory } from "redux/middleware/articlesPost";
import { useDispatch, useSelector } from "react-redux";
import { addContent } from "redux/contentSlice";

export const FormAddCategory = () => {
  const dispatch = useDispatch();
  const { blockMenu } = useSelector((state) => state.contentReducer);
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    dispatch(fetchAddCategory(values));
    dispatch(addContent(""));
  };

  return (
    <Form onFinish={onFinish} name={"addCategory"} className={s.form}>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Выберите блок меню!",
          },
        ]}
        name={"menuBlock"}
        label={"Выберите блок меню"}
        className={s.select}
      >
        <Select>
          {blockMenu?.map((block) => (
            <Select.Option key={block._id}>{block.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Укажите название раздела!",
          },
        ]}
        name={"category"}
        label={"Название раздела"}
        className={s.input}
      >
        <Input />
      </Form.Item>
      <Form.Item className={s.button}>
        <Button style={{ width: "100%" }} type={"primary"} htmlType={"submit"}>
          Сохранить категорию
        </Button>
      </Form.Item>
    </Form>
  );
};
