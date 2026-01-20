"use client";

import React from 'react';
import { Row, Col, Statistic, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { 
  UserOutlined, 
  DollarCircleOutlined, 
  ShoppingCartOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import MainLayout from '@/components/layout/MainLayout';
import AdminCard from '@/components/common/AdminCard';
import AdminTable from '@/components/common/AdminTable';
import styles from './dashboard.module.scss';

const UserMap = dynamic(() => import('@/components/common/UserMap'), { 
  ssr: false,
  loading: () => <div className={styles.mapPlaceholder} />
});

const { Title } = Typography;

const DashboardPage = () => {
  const t = useTranslations('Dashboard');
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const dataSource = data?.recentActivity || [];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
  ];

  if (!isMounted) {
    return null; 
  }

  return (
    <MainLayout>
      {loading ? (
        <div className={styles.loadingWrapper}>Loading...</div>
      ) : !data ? (
        <div className={styles.errorWrapper}>Error loading dashboard data</div>
      ) : (
        <>
          <Title level={2} className={styles.dashboardHeader}>{t('title')}</Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <AdminCard>
                <Statistic 
                  title={t('stats.users')} 
                  value={data.stats.users} 
                  prefix={<UserOutlined />} 
                />
              </AdminCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <AdminCard>
                <Statistic 
                  title={t('stats.revenue')} 
                  value={data.stats.revenue} 
                  prefix={<DollarCircleOutlined />} 
                  precision={2}
                  suffix="$"
                />
              </AdminCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <AdminCard>
                <Statistic 
                  title={t('stats.orders')} 
                  value={data.stats.orders} 
                  prefix={<ShoppingCartOutlined />} 
                />
              </AdminCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <AdminCard>
                <Statistic 
                  title={t('stats.active')} 
                  value={data.stats.active} 
                  prefix={<TeamOutlined />} 
                />
              </AdminCard>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className={styles.mapRow}>
            <Col xs={24} lg={16}>
              <AdminCard title={t('map.title')}>
                <UserMap />
              </AdminCard>
            </Col>
            <Col xs={24} lg={8}>
              <AdminCard title="Recent Activity">
                <AdminTable 
                  dataSource={dataSource} 
                  columns={columns} 
                  pagination={false} 
                  size="small"
                />
              </AdminCard>
            </Col>
          </Row>
        </>
      )}
    </MainLayout>
  );
};

export default DashboardPage;
