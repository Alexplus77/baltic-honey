import React, { useEffect, useState } from "react";
import { Form, Button, Upload, Tooltip, message } from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  CloseOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { uploadMedia, removeUploadMedia } from "redux/middleware/articlesPost";
import { useDispatch, useSelector } from "react-redux";
import s from "./MediaEditor.module.css";

export const MediaEditor = () => {
  const [success, setSuccess] = useState(false);
  const { uploadMediaItems, uploadMediaMod } = useSelector(
    (state) => state.contentReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadMedia());
  }, [uploadMediaMod]);
  const handleCopy = (path) => {
    navigator.clipboard
      .writeText(path)
      .then(() => message.success("Success copied!!!"));
  };
  const removeMedia = (name) => {
    dispatch(removeUploadMedia(name));
  };
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
            <div className={s.containerActions}>
              <CloseOutlined
                onClick={() => removeMedia(el.name)}
                className={s.iconDelete}
              />
              <Tooltip title={"copy path"}>
                <CopyOutlined
                  onClick={() => handleCopy(el.path)}
                  className={s.iconCopy}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
