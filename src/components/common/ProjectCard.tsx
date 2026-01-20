import React from 'react';
import { Card, Tag, Typography, Button, Tooltip, Space } from 'antd';
import { 
  LinkOutlined, 
  GlobalOutlined, 
  CloudUploadOutlined,
  EyeOutlined,
  DeleteOutlined 
} from '@ant-design/icons';
import { Project } from '@/app/[locale]/projects/types';
import styles from '@/app/[locale]/projects/projects.module.scss';

const { Title, Text, Link: AntdLink } = Typography;

interface ProjectCardProps {
  project: Project;
  onView: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  t: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onView, 
  onDelete,
  t 
}) => {
  return (
    <Card hoverable className={styles.projectCard}>
      <div className={styles.cardContent}>
        <div>
          <Text 
            ellipsis={{ tooltip: project.url }} 
            className={styles.urlLink}
            style={{ marginBottom: '4px', display: 'block' }}
          >
            <AntdLink href={project.url} target="_blank">
              <LinkOutlined /> {project.url}
            </AntdLink>
          </Text>

          <div className={styles.cardTitleRow}>
            <Title 
              level={4} 
              ellipsis={{ tooltip: project.name }} 
              className={styles.cardTitle}
              onClick={() => onView(project.id)}
            >
              {project.name}
            </Title>
            <Tag color={project.isLive ? 'green' : 'red'} className={styles.statusTag}>
              {project.isLive ? t('status.live') : t('status.issue')}
            </Tag>
          </div>
          
          <div className={styles.tagContainer}>
            <Tag icon={<GlobalOutlined />} className={styles.countryTag}>
              {project.country}
            </Tag>
            <Tag color="blue" icon={<CloudUploadOutlined />} className={styles.deploymentTag}>
              {project.deployments}
            </Tag>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.statusInfo}>
            <Text type="secondary" className={styles.statusLabel}>
              {t('status.stable')}
            </Text>
            <div className={styles.statusValue}>{project.status}</div>
          </div>
          <Space size="small">
            <Tooltip title={t('details_btn')}>
              <Button 
                type="text" 
                shape="circle"
                icon={<EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} />} 
                onClick={() => onView(project.id)} 
              />
            </Tooltip>
            <Tooltip title={t('delete_btn')}>
              <Button 
                type="text" 
                shape="circle"
                danger 
                icon={<DeleteOutlined style={{ fontSize: '18px' }} />} 
                onClick={() => onDelete(project.id, project.name)} 
              />
            </Tooltip>
          </Space>
        </div>
      </div>
    </Card>
  );
};
