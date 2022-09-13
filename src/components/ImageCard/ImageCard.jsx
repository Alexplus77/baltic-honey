import s from "./ImageCard.module.css";
import { Image, message, Tooltip } from "antd";
import { CloseOutlined, CopyOutlined } from "@ant-design/icons";
import React from "react";
import { removeUploadMedia } from "redux/middleware/articlesPost";
import { useDispatch } from "react-redux";

export const ImageCard = ({ el }) => {
  const dispatch = useDispatch();
  const handleCopy = (path) => {
    navigator.clipboard
      .writeText(path)
      .then(() => message.success("Success copied!!!"));
  };
  const removeMedia = (name) => {
    dispatch(removeUploadMedia(name));
  };
  return (
    <div key={el.name} className={s.cardImage}>
      <Image
        className={s.image}
        src={el.path}
        width={100}
        preview={{
          src: el.path,
        }}
      />
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
  );
};
