"use client";

import React from 'react';
import { Layout, Button, Select } from 'antd';
import Sidebar from './Sidebar';
import { useRouter, usePathname } from '@/navigation';
import { useLocale } from 'next-intl';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          zIndex: 1
        }}>
          <div>
            <Text strong style={{ fontSize: '18px' }}>Admin Dashboard</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select 
              defaultValue={locale} 
              style={{ width: 110, marginRight: 24 }} 
              onChange={handleLanguageChange}
              options={[
                { value: 'en', label: '🇬🇧 English' },
                { value: 'hi', label: '🇮🇳 हिन्दी' },
              ]}
            />
            <Space size="middle">
              <Text type="secondary">Admin User</Text>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </Space>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8 }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Admin Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
