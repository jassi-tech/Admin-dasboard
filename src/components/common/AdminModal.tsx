"use client";

import React from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";

interface AdminModalProps extends ModalProps {
  children: React.ReactNode;
}

const AdminModal: React.FC<AdminModalProps> = ({ children, ...props }) => {
  return (
    <Modal 
      centered 
      destroyOnClose
      {...props}
    >
      {children}
    </Modal>
  );
};

export default AdminModal;
