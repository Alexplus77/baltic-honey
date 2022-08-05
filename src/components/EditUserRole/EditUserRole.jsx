import React, { useState } from "react";
import { Button, Form, Modal, Select } from "antd";
import { editUsersRole } from "redux/middleware/getUsersList";
import { useDispatch } from "react-redux";
import s from "./EditUserRole.module.css";
export const EditUserRole = ({
  editRole,
  setEditRole,
  selectedRows,
  setSelectedRows,
}) => {
  const [roleUser, setRoleUser] = useState();
  const dispatch = useDispatch();
  const userRoles = ["user", "admin"];

  const handleCancel = () => {
    setEditRole(false);
  };

  const onFinish = (values) => {
    dispatch(editUsersRole({ usersList: selectedRows, role: values.role }));
    setEditRole(false);
    setSelectedRows([]);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      visible={editRole && selectedRows.length}
      title={"Редактирование роли выбранных пользователей"}
      onCancel={handleCancel}
      footer={null}
      className={s.container}
    >
      <Form
        className={s.form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name={"role"}>
          <Select placeholder={"Выберите роль"}>
            {userRoles.map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className={s.btn}>
          <Button htmlType={"submit"} type={"primary"}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
