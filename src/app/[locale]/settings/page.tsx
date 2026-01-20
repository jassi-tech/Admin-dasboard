"use client";

import React, { useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, Switch, Divider, App } from 'antd';
import { useTranslations } from 'next-intl';
import MainLayout from '@/components/layout/MainLayout';
import AdminCard from '@/components/common/AdminCard';
import { UserOutlined, LockOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';
import styles from './settings.module.scss';

const { Title, Text } = Typography;

const SettingsPage = () => {
    const { message } = App.useApp();
    const t = useTranslations('Settings');
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const onFinish = (values: any) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('Settings updated successfully!');
        }, 1000);
    };

    return (
        <MainLayout>
            <div className={styles.settingsWrapper}>
                <Title level={2}>{t('title')}</Title>
                <Text type="secondary">{t('subtitle')}</Text>
                
                <Divider />

                <AdminCard>
                    <Title level={4}><UserOutlined /> {t('profile_settings')}</Title>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{ name: 'Admin User', email: 'admin@example.com' }}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item label={t('name')} name="name">
                                    <Input placeholder="Enter your name" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label={t('email')} name="email">
                                    <Input placeholder="Enter your email" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t('save_profile')}
                        </Button>
                    </Form>
                </AdminCard>

                <AdminCard className={styles.sectionCard}>
                    <Title level={4}><LockOutlined /> {t('security_settings')}</Title>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label={t('current_password')} name="currentPassword">
                            <Input.Password />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item label={t('new_password')} name="newPassword">
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label={t('confirm_password')} name="confirmPassword">
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t('update_password')}
                        </Button>
                    </Form>
                </AdminCard>

                <AdminCard className={styles.sectionCard}>
                    <Title level={4}><BellOutlined /> {t('notification_settings')}</Title>
                    <div className={styles.settingItem}>
                        <Text>{t('email_notifications')}</Text>
                        <Switch defaultChecked />
                    </div>
                    <div className={styles.settingItem}>
                        <Text>{t('push_notifications')}</Text>
                        <Switch defaultChecked />
                    </div>
                </AdminCard>
                
                <AdminCard className={styles.dangerCard}>
                    <Title level={4} className={styles.dangerTitle}>{t('danger_zone')}</Title>
                    <Text>{t('danger_description')}</Text>
                    <div className={styles.dangerAction}>
                        <Button danger>{t('delete_account')}</Button>
                    </div>
                </AdminCard>
            </div>
        </MainLayout>
    );
};

export default SettingsPage;
