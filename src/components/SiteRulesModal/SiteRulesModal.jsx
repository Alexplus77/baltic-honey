import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

export const SiteRulesModal = ({ isModalSiteRules, setIsModalSiteRules }) => {
  const [textSiteRules, setTextSiteRules] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}getSiteRules`).then(({ data }) => {
      setTextSiteRules(data);
    });
  }, []);
  const handleCancel = () => {
    setIsModalSiteRules(false);
  };

  return (
    <Modal
      visible={isModalSiteRules}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <div>{textSiteRules}</div>
    </Modal>
  );
};
