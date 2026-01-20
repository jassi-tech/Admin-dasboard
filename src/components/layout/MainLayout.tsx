"use client";

import React from 'react';
import { Layout, Button, Select } from 'antd';
import Sidebar from './Sidebar';
import { useRouter, usePathname } from '@/navigation';
import { useLocale } from 'next-intl';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from 'antd';
import styles from './MainLayout.module.scss';

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
    <Layout className={styles.mainLayout}>
      <Sidebar />
      <Layout>
        <Header className={styles.header}>
          <div>
            <Text strong className={styles.headerTitle}>Admin Dashboard</Text>
          </div>
          <div className={styles.headerActions}>
            <Select 
              defaultValue={locale} 
              className={styles.langSelector} 
              onChange={handleLanguageChange}
              options={[
                { value: 'en', label: '🇬🇧 English' },
                { value: 'hi', label: '🇮🇳 हिन्दी' },
              ]}
            />
            <Space size="middle">
              <Text type="secondary" className={styles.userName}>Admin User</Text>
              <Avatar icon={<UserOutlined />} className={styles.userAvatar} />
            </Space>
          </div>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
        <Footer className={styles.footer}>
          Admin Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
