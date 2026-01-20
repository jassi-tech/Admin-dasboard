"use client";

import React, { useState } from 'react';
import { Modal, Input, Typography, Button, message } from 'antd';
import { LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import styles from './DeleteSecurityModal.module.scss'; // Reusing styles

const { Title, Text } = Typography;

interface SecurityGateModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

const SecurityGateModal: React.FC<SecurityGateModalProps> = ({
  open,
  onCancel,
  onSuccess,
  title = "Security Verification",
  description = "Please enter the security OTP sent to your admin email to proceed.",
  actionText = "Verify & Access"
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const VALID_OTP = '123456';

  const handleVerify = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (otp === VALID_OTP) {
        onSuccess();
        setOtp('');
        message.success('Identity Verified');
      } else {
        message.error('Invalid OTP. Please enter 123456.');
      }
      setLoading(false);
    }, 800);
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
          onClick={handleVerify} 
          loading={loading}
          disabled={otp.length !== 6}
        >
          {actionText}
        </Button>
      ]}
      width={400}
      centered
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={4} style={{ marginBottom: '8px' }}>{title}</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
          {description}
          <br />
          <Text type="secondary" style={{ fontSize: '11px' }}>(Testing OTP: 123456)</Text>
        </Text>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Input.OTP 
            length={6} 
            value={otp} 
            onChange={(val) => setOtp(val)} 
          />
        </div>
      </div>
    </Modal>
  );
};

export default SecurityGateModal;
