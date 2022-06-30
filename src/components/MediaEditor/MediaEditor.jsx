import React, { useEffect, useRef } from "react";
import { Form, Button, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { uploadMedia } from "redux/middleware/articlesPost";
import { useDispatch, useSelector } from "react-redux";
import s from "./MediaEditor.module.css";

export const MediaEditor = () => {
  const { uploadMediaItems } = useSelector((state) => state.contentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadMedia());
  }, []);
  const normFile = (e) => {
    dispatch(uploadMedia());
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className={s.containerMediaEditor}>
      <Form>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            action={`${process.env.REACT_APP_URL}uploadMedia`}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
      <div className={s.mediaItems}>
        {uploadMediaItems?.map((el) => (
          <div key={el.id} className={s.cardImage}>
            <img style={{ width: "100px" }} src={el.path} />
            <div className={s.describe}>
              <strong>Name: {el.name}</strong>
              <em>Path: {el.path}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
