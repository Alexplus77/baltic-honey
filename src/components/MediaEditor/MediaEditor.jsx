import React, { useEffect, useState } from "react";
import { Button, Upload } from "antd";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { getUploadMedia, uploadMedia } from "redux/middleware/articlesPost";
import { useDispatch, useSelector } from "react-redux";
import s from "./MediaEditor.module.css";
import { ImageCard } from "../ImageCard";

export const MediaEditor = () => {
  const [file, setFile] = useState(null);
  const { uploadMediaItems, error } = useSelector(
    (state) => state.contentReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUploadMedia());
  }, []);

  const handleUploadFile = () => {
    const data = new FormData();
    data.append("file", file);
    dispatch(uploadMedia(data));
  };

  return (
    <div className={s.containerMediaEditor}>
      <div className={s.uploadImage}>
        <Upload
          name="file"
          listType="picture"
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
        <Button type={"primary"} onClick={handleUploadFile}>
          Отправить
        </Button>
      </div>

      <div className={s.mediaItems}>
        {uploadMediaItems?.map((el) => (
          <ImageCard key={el.name} el={el} />
        ))}
      </div>
    </div>
  );
};
