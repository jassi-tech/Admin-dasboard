"use client";

import React from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import AdminCard from '@/components/common/AdminCard';
import styles from './login.module.scss';

const { Title } = Typography;

const LoginPage = () => {
  const t = useTranslations('Login');
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push('/auth/2fa');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Connection error');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <AdminCard className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <Title level={2}>{t('title')}</Title>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder={t('email')} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('password')} />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('remember_me')}</Checkbox>
            </Form.Item>
            <a className={styles.forgotPassword} href="">
              {t('forgot_password')}
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </AdminCard>
    </div>
  );
};

export default LoginPage;
