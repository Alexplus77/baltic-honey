import React, { useEffect, useState } from "react";
import s from "./UsersList.module.css";
import { Table, Space, Tooltip, Modal, Input, Form } from "antd";
import { CloseOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeUsers } from "redux/middleware/getUsersList";
import { EditUserRole } from "../EditUserRole";

export const UsersList = () => {
  const { usersList } = useSelector((state) => state.contentReducer);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRole, setEditRole] = useState(false);
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
      filters: [
        {
          text: "user",
          value: "user",
        },
        {
          text: "admin",
          value: "admin",
        },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "AgreementMailing",
      key: "agreementMailing",
      render: (_, data) => (
        <input
          type={"checkbox"}
          readOnly={true}
          checked={data.agreementMailing}
        />
      ),
      filters: [
        {
          text: "AgreementMailing",
          value: "agreementMailing",
        },
      ],
      onFilter: (value, record) => record[value],
    },
  ];
  const selectOnChange = (newSelectRows) => {
    setSelectedRows(newSelectRows);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: selectOnChange,
  };

  const handleRemoveUsers = (selectedEmail) => {
    dispatch(removeUsers({ usersList: selectedEmail }));
  };

  return (
    <section className={s.container}>
      <EditUserRole
        editRole={editRole}
        setEditRole={setEditRole}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Space size={"middle"} className={s.iconMailSend}>
        <Tooltip
          title={"Написать письмо выделенным пользователям"}
          color={"blue"}
        >
          <MailOutlined />
        </Tooltip>
        <Tooltip
          title={"Редактировать роль выделенных пользователей"}
          color={"blue"}
        >
          <EditOutlined onClick={() => setEditRole(true)} />
        </Tooltip>
        <Tooltip
          title={"Удалить профиль выделенных пользователей"}
          color={"red"}
        >
          <CloseOutlined
            onClick={() => handleRemoveUsers(selectedRows)}
            style={{ color: "red" }}
          />
        </Tooltip>
      </Space>
      <Table
        rowKey={(record) => record.email}
        rowSelection={rowSelection}
        dataSource={usersList}
        columns={columns}
      />
    </section>
  );
};
