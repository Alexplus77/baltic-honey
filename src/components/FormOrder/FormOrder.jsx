import React from "react";
import s from "./FormOrder.module.css";
import { Form, Input, InputNumber, Select } from "antd";

export const FormOrder = () => {
  const volume = [1, 3];
  return (
    <Form className={s.formOrder}>
      <Form.Item label={"Выберите обьем(л)"}>
        <Select>
          {volume.map((el) => (
            <Select.Option key={el}>{el}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={"Напишите количество(шт)"}>
        <InputNumber />
      </Form.Item>
      <Form.Item label={"Напишите контактный телефон"}>
        <InputNumber />
      </Form.Item>
    </Form>
  );
};
