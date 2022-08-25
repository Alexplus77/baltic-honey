import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

export const SiteRulesModal = ({ isModalSiteRules, setIsModalSiteRules }) => {
  const [textSiteRules, setTextSiteRules] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}getSiteRules/${isModalSiteRules}`)
      .then(({ data }) => {
        setTextSiteRules(data);
      });
  }, [isModalSiteRules]);
  const handleCancel = () => {
    setIsModalSiteRules(null);
  };
  return (
    <Modal
      visible={isModalSiteRules}
      onOk={handleCancel}
      onCancel={handleCancel}
      width={900}
    >
      <div dangerouslySetInnerHTML={{ __html: textSiteRules }}></div>
    </Modal>
  );
};
