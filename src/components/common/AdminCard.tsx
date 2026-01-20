"use client";

import React from "react";
import { Card } from "antd";
import type { CardProps } from "antd";
import styles from "./AdminCard.module.scss";

interface AdminCardProps extends CardProps {
  children: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ children, className, ...props }) => {
  return (
    <Card 
      variant="borderless" 
      className={`${styles.adminCard} ${className || ''}`}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AdminCard;
