"use client";

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

const AdminTable = <T extends object>(props: TableProps<T>) => {
  return (
    <Table 
      {...props} 
      pagination={{ ...props.pagination, showSizeChanger: true }}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default AdminTable;
