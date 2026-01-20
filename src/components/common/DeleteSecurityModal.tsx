"use client";

import React, { useState } from 'react';
import { Modal, Input, Typography, Space, Button, message } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import styles from './DeleteSecurityModal.module.scss';

const { Title, Text } = Typography;

interface DeleteSecurityModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}

const DeleteSecurityModal: React.FC<DeleteSecurityModalProps> = ({
  open,
  onCancel,
  onConfirm,
  itemName,
  loading = false,
}) => {
  const [otp, setOtp] = useState('');
  const [confirming, setConfirming] = useState(false);

  // Mock OTP for demonstration - in real app this would come from backend/SMS/Email
  const VALID_OTP = '123456';

  const handleConfirm = () => {
    if (otp === VALID_OTP) {
      onConfirm();
      setOtp('');
    } else {
      message.error('Invalid OTP. Please enter 123456 for testing.');
    }
  };

  const internalOnCancel = () => {
    setOtp('');
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={internalOnCancel}
      footer={[
        <Button key="cancel" onClick={internalOnCancel}>
          Cancel
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          danger 
          onClick={handleConfirm} 
          loading={loading || confirming}
          disabled={otp.length !== 6}
        >
          Verify & Delete
        </Button>
      ]}
      width={400}
      centered
    >
      <div className={styles.otpModalContainer}>
        <WarningOutlined className={styles.modalIcon} />
        <Title level={4} className={styles.modalTitle}>Security Verification</Title>
        <Text className={styles.modalDescription}>
          To delete <strong>{itemName}</strong>, please enter the security OTP sent to your admin email.
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>(Testing OTP: 123456)</Text>
        </Text>

        <div className={styles.otpWrapper}>
          <Input.OTP 
            length={6} 
            value={otp} 
            onChange={(val) => setOtp(val)} 
            onInput={(val) => setOtp(val.join(''))}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSecurityModal;
