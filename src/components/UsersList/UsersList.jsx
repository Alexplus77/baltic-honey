import React, { useState } from "react";
import s from "./UsersList.module.css";
import { Table, Space, Tooltip, message } from "antd";
import { CloseOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeUsers } from "redux/middleware/getUsersList";
import { EditUserRole } from "../EditUserRole";
import { EditorMail } from "components/EditorMail";

export const UsersList = () => {
  const { usersList, userData } = useSelector((state) => state.contentReducer);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRole, setEditRole] = useState(false);
  const [mailingMode, setMailingMode] = useState(false);
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
  const onSendMailMod = () => {
    !selectedRows.length && message.error("Нет выбраных пользователей!!!");
    selectedRows.length && setMailingMode(true);
  };
  const onEditRoleMode = () => {
    if (userData.role !== "superAdmin") {
      return message.error(
        "У вас нет прав для редактирования роли пользователей, войдите с правами суперадминистратора!!!"
      );
    }
    !selectedRows.length && message.error("Нет выбраных пользователей!!!");
    selectedRows.length && setEditRole(true);
  };
  const handleRemoveUsers = () => {
    !selectedRows.length && message.error("Нет выбраных пользователей!!!");
    selectedRows && dispatch(removeUsers({ usersList: selectedRows }));
    setSelectedRows([]);
  };

  return (
    <section className={s.container}>
      <EditorMail
        mailingMod={mailingMode}
        selectedRows={selectedRows}
        setMailingMode={setMailingMode}
        setSelectedRows={setSelectedRows}
      />
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
          <MailOutlined onClick={onSendMailMod} />
        </Tooltip>
        <Tooltip
          title={"Редактировать роль выделенных пользователей"}
          color={"blue"}
        >
          <EditOutlined onClick={onEditRoleMode} />
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
        rowSelection={rowSelection}
        dataSource={usersList.filter((el) => el.role !== "superAdmin")}
        columns={columns}
      />
    </section>
  );
};
