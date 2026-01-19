"use client";

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';

const { Sider } = Layout;

const Sidebar = () => {
  const t = useTranslations('Sidebar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">{t('dashboard')}</Link>,
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: <Link href="/users">{t('users')}</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">{t('settings')}</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('logout'),
      danger: true,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = `/${locale}/login`;
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogout();
    }
  };

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      theme="dark"
      width={250}
    >
      <div style={{ 
        height: 64, 
        margin: 16, 
        background: 'rgba(255, 255, 255, 0.2)',
        display: collapsed ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.2rem'
      }}>
        ADMIN DASHBOARD
      </div>
      <Menu 
        theme="dark" 
        selectedKeys={[pathname]} 
        mode="inline" 
        items={menuItems} 
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
