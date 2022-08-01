import React, { useState } from "react";
import s from "./UsersList.module.css";
import { Table, Space, Tooltip } from "antd";
import { CloseOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeUsers } from "redux/middleware/getUsersList";

export const UsersList = () => {
  const { usersList } = useSelector((state) => state.contentReducer);
  const [selectedRows, setSelectedRows] = useState();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Checked",
      key: "checked",
      render: (_, data) => (
        <input type={"checkbox"} readOnly={true} checked={data.checked} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size={"middle"} className={s.btns}>
          <Tooltip title={"Написать письмо пользователю"} color={"blue"}>
            <MailOutlined />
          </Tooltip>
          <Tooltip title={"Редактировать профиль"} color={"blue"}>
            <EditOutlined />
          </Tooltip>
          <Tooltip title={"Удалить профиль"} color={"red"}>
            <CloseOutlined style={{ color: "red" }} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const selectOnChange = (newSelectRows) => {
    setSelectedRows(newSelectRows);
  };
  const rowSelection = {
    selectedRows,
    onChange: selectOnChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.email,
    }),
  };
  console.log(selectedRows);
  const handleRemoveUsers = () => {
    dispatch(removeUsers({ usersList: selectedRows }));
  };
  return (
    <section className={s.container}>
      <Space size={"middle"} className={s.iconMailSend}>
        <Tooltip
          title={"Написать письмо выделенным пользователям"}
          color={"blue"}
        >
          <MailOutlined />
        </Tooltip>
        <Tooltip
          title={"Редактировать профиль выделенных пользователей"}
          color={"blue"}
        >
          <EditOutlined />
        </Tooltip>
        <Tooltip
          title={"Удалить профиль выделенных пользователей"}
          color={"red"}
        >
          <CloseOutlined onClick={handleRemoveUsers} style={{ color: "red" }} />
        </Tooltip>
      </Space>
      <Table
        rowKey={(record) => record.email}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={usersList}
        columns={columns}
      />
    </section>
  );
};
