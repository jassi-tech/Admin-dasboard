import React from 'react';
import { Row, Col, Typography, Tag, Space } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  BarChartOutlined,
  GlobalOutlined,
  CloudUploadOutlined,
  HistoryOutlined,
  ProjectOutlined,
  BellOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import AdminCard from '@/components/common/AdminCard';
import { Project } from '@/app/[locale]/projects/types';
import styles from '@/app/[locale]/projects/projects.module.scss';

const { Title, Text } = Typography;

interface ProjectDetailsContentProps {
  project: Project;
  t: any;
}

export const ProjectDetailsContent: React.FC<ProjectDetailsContentProps> = ({ project, t }) => {
  return (
    <Row gutter={[16, 16]}>
      {/* Status Section */}
      <Col xs={24} lg={12}>
        <AdminCard title={t('status.title')}>
          <div className={styles.statusSection}>
            {project.isLive ? (
              <>
                <CheckCircleOutlined className={styles.mainIcon} style={{ color: '#52c41a' }} />
                <Title level={3} className={styles.statusTitle} style={{ color: '#52c41a' }}>
                  {t('status.live')}
                </Title>
                <Tag color="success" className={styles.statusTag}>{project.status}</Tag>
              </>
            ) : (
              <>
                <CloseCircleOutlined className={styles.mainIcon} style={{ color: '#ff4d4f' }} />
                <Title level={3} className={styles.statusTitle} style={{ color: '#ff4d4f' }}>
                  {t('status.issue')}
                </Title>
                <Tag color="error" className={styles.statusTag}>{project.status}</Tag>
              </>
            )}
            
            <div className={styles.analysisBox}>
              <Space>
                <BarChartOutlined style={{ fontSize: '18px' }} />
                <span>
                  <strong>{t('status.analysis')}:</strong> {project.analysis}
                </span>
              </Space>
            </div>

            <div className={styles.statsDisplay}>
              <Row gutter={[16, 24]}>
                <Col span={12}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t('status.country')}</span>
                    <span className={styles.statValue}>
                      <GlobalOutlined className={styles.statIcon} /> {project.country}
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t('status.deployments')}</span>
                    <span className={styles.statValue}>
                      <CloudUploadOutlined className={styles.statIcon} /> {project.deployments}
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t('status.last_checked')}</span>
                    <span className={styles.statValue}>
                      <HistoryOutlined className={styles.statIcon} /> 
                      {new Date(project.lastChecked).toLocaleTimeString()}
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t('status.response_time')}</span>
                    <span className={styles.statValue}>{project.responseTime}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </AdminCard>
      </Col>
      
      {/* Deliverables Section */}
      <Col xs={24} lg={12}>
        <AdminCard title={t('features.title')}>
          <div className={styles.deliverablesGrid}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className={styles.deliverableCard}>
                  <span className={styles.delivLabel}>{t('features.pages')}</span>
                  <div className={styles.delivValue}>
                    <ProjectOutlined className={styles.delivIcon} />
                    {project.features.pages}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.deliverableCard}>
                  <span className={styles.delivLabel}>{t('features.logs')}</span>
                  <div className={styles.delivValue}>
                    <HistoryOutlined className={styles.delivIcon} />
                    {project.features.logs}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.deliverableCard}>
                  <span className={styles.delivLabel}>{t('features.alerts')}</span>
                  <div className={styles.delivValue} 
                    style={{ color: project.features.alerts > 0 ? '#ff4d4f' : 'inherit' }}
                  >
                    <BellOutlined className={styles.delivIcon} />
                    {project.features.alerts}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.deliverableCard}>
                  <span className={styles.delivLabel}>{t('features.reports')}</span>
                  <div className={styles.delivValue}>
                    <FileTextOutlined className={styles.delivIcon} />
                    {project.features.reports}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </AdminCard>
      </Col>
    </Row>
  );
};
