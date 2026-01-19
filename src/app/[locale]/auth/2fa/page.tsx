"use client";

import React, { useState } from 'react';
import { Input, Button, Typography, App } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import AdminCard from '@/components/common/AdminCard';
import { setCookie } from 'cookies-next';

const { Title, Paragraph } = Typography;

const TwoFAPage = () => {
  const { message } = App.useApp();
  const t = useTranslations('TwoFA');
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleVerify = async () => {
    if (otp.length === 6) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-2fa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: otp }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setCookie('auth_token', data.token, { maxAge: 60 * 60 * 24 });
          message.success('Authentication successful!');
          router.push('/dashboard');
        } else {
          message.error(data.message || 'Verification failed');
        }
      } catch (error) {
        console.error('2FA error:', error);
        message.error('Connection error');
      }
    } else {
      message.error('Please enter a valid 6-digit code');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <AdminCard style={{ width: 400, textAlign: 'center' }}>
        <Title level={2}>{t('title')}</Title>
        <Paragraph>{t('instruction')}</Paragraph>
        <div style={{ marginBottom: 24 }}>
          <Input.OTP 
            length={6} 
            value={otp} 
            onChange={(val) => setOtp(val)} 
            size="large"
          />
        </div>
        <Button 
          type="primary" 
          block 
          size="large" 
          onClick={handleVerify}
        >
          {t('submit')}
        </Button>
        <Button 
          type="link" 
          style={{ marginTop: 16 }}
        >
          {t('resend')}
        </Button>
      </AdminCard>
    </div>
  );
};

export default TwoFAPage;
