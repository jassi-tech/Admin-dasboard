"use client";

import React from "react";
import { Card } from "antd";
import type { CardProps } from "antd";

interface AdminCardProps extends CardProps {
  children: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ children, ...props }) => {
  return (
    <Card 
      variant="borderless" 
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AdminCard;
