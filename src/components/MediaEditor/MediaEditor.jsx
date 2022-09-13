import React, { useEffect, useState } from "react";
import { Button, Pagination, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { getUploadMedia, uploadMedia } from "redux/middleware/articlesPost";
import { useDispatch, useSelector } from "react-redux";
import s from "./MediaEditor.module.css";
import { ImageCard } from "../ImageCard";

export const MediaEditor = () => {
  const sizePage = 4; // Количество карточек изображений на одной странице
  const [file, setFile] = useState(null);
  const { uploadMediaItems } = useSelector((state) => state.contentReducer);
  const [paginationImage, setPaginationImage] = useState({
    paginationImages: [],
    currentIndex: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUploadMedia());

    setPaginationImage((prev) => {
      prev.paginationImages = uploadMediaItems.slice(0, sizePage);
      prev.currentIndex = 0;
      return { ...prev };
    });
  }, [uploadMediaItems?.length]);

  const handleUploadFile = () => {
    const data = new FormData();
    data.append("file", file);
    dispatch(uploadMedia(data));
  };

  useEffect(() => {
    setPaginationImage((prev) => {
      prev.paginationImages = uploadMediaItems.slice(
        paginationImage.currentIndex,
        paginationImage.currentIndex + sizePage
      );
      return { ...prev };
    });
  }, [paginationImage.currentIndex]);

  const paginationImages = (page, pageSize) => {
    setPaginationImage((prev) => {
      prev.currentIndex = (page - 1) * pageSize;
      return { ...prev };
    });
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
        {paginationImage?.paginationImages?.map((el) => (
          <ImageCard key={el.name} el={el} />
        ))}
      </div>
      <Pagination
        className={s.pagination}
        defaultCurrent={1}
        total={uploadMediaItems.length && uploadMediaItems.length}
        pageSize={sizePage}
        onChange={(page, pageSize) => paginationImages(page, pageSize)}
      />
    </div>
  );
};
