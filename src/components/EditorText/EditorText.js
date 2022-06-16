import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "antd";
import s from "./EditorText.module.css";
import { addContent } from "redux/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

export const EditorText = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.contentReducer);
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      dispatch(addContent(editorRef.current.getContent()));
    }
  };

  return (
    <div className={s.editor}>
      <Editor
        apiKey="2kgtc3yizooqk6vrgspu437raj4qk1tia9puu03nbdk7abxm"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
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
        Добавить контент в статью
      </Button>
    </div>
  );
};
