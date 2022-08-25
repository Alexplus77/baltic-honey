import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { sendMail } from "redux/middleware/getUsersList";
import { Button, Modal, message } from "antd";
import s from "./EditorMail.module.css";

export const EditorMail = ({
  mailingMod,
  setMailingMode,
  selectedRows,
  setSelectedRows,
}) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const log = () => {
    !selectedRows.length && message.error("Нет выбраных пользователей!!!");
    if (editorRef.current) {
      dispatch(
        sendMail({
          usersList: selectedRows,
          mailText: editorRef.current.getContent(),
        })
      );
      setSelectedRows([]);
      setMailingMode(false);
    }
  };

  return (
    <Modal
      footer={null}
      visible={mailingMod}
      onCancel={() => setMailingMode(false)}
      width={"80%"}
    >
      <div className={s.editor}>
        <Editor
          apiKey="2kgtc3yizooqk6vrgspu437raj4qk1tia9puu03nbdk7abxm"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={"Добрый день"}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <Button className={s.button} type={"primary"} onClick={log}>
          Отправить письмо
        </Button>
      </div>
    </Modal>
  );
};
