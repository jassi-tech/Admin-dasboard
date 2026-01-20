import React, { useState } from 'react';
import { Typography, Button, Segmented, Tag } from 'antd';
import { LockOutlined, CloudOutlined, ExperimentOutlined, SafetyOutlined } from '@ant-design/icons';
import AdminCard from '@/components/common/AdminCard';
import { Project } from '@/app/[locale]/projects/types';
import styles from '@/app/[locale]/projects/projects.module.scss';

const { Title, Text } = Typography;

type Environment = 'stable' | 'testing' | 'mainnet';

interface CredentialsSectionProps {
  project: Project;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  project,
  isUnlocked,
  onUnlock,
  onLock
}) => {
  const [environment, setEnvironment] = useState<Environment>('stable');

  const getEnvironmentConfig = (env: Environment) => {
    const configs = {
      stable: {
        label: 'Stable',
        color: 'success',
        icon: <SafetyOutlined />,
        apiKey: `PK_STABLE_${Math.random().toString(36).substring(7).toUpperCase()}`,
        database: `db-stable-${project.id}`,
        endpoint: `https://stable-api.${project.url.replace('https://', '')}`,
        port: '8080'
      },
      testing: {
        label: 'Testing',
        color: 'warning',
        icon: <ExperimentOutlined />,
        apiKey: `PK_TEST_${Math.random().toString(36).substring(7).toUpperCase()}`,
        database: `db-test-${project.id}`,
        endpoint: `https://test-api.${project.url.replace('https://', '')}`,
        port: '8081'
      },
      mainnet: {
        label: 'Mainnet',
        color: 'processing',
        icon: <CloudOutlined />,
        apiKey: `PK_PROD_${Math.random().toString(36).substring(7).toUpperCase()}`,
        database: `db-cluster-${project.id}-prod`,
        endpoint: `https://api.${project.url.replace('https://', '')}`,
        port: '443'
      }
    };
    return configs[env];
  };

  const currentConfig = getEnvironmentConfig(environment);

  return (
    <AdminCard title="Project Credentials & Admin Access" className={styles.credentialsCard}>
      {!isUnlocked ? (
        <div className={styles.lockContent}>
          <LockOutlined className={styles.lockIcon} />
          <Title level={4} className={styles.lockTitle}>Restricted Access Zone</Title>
          <Text className={styles.lockDesc}>
            This section contains sensitive information including administrative IDs, passwords, and API keys.
          </Text>
          <Button 
            type="primary" 
            size="large" 
            onClick={onUnlock}
          >
            Unlock More Details
          </Button>
        </div>
      ) : (
        <div className={styles.secureDataList}>
          {/* Environment Selector */}
          <div className={styles.environmentSelector}>
            <Text strong style={{ marginBottom: '12px', display: 'block' }}>
              Select Environment:
            </Text>
            <Segmented
              value={environment}
              onChange={(value) => setEnvironment(value as Environment)}
              options={[
                {
                  label: (
                    <div style={{ padding: '4px 8px' }}>
                      <SafetyOutlined style={{ marginRight: '6px' }} />
                      Stable
                    </div>
                  ),
                  value: 'stable'
                },
                {
                  label: (
                    <div style={{ padding: '4px 8px' }}>
                      <ExperimentOutlined style={{ marginRight: '6px' }} />
                      Testing
                    </div>
                  ),
                  value: 'testing'
                },
                {
                  label: (
                    <div style={{ padding: '4px 8px' }}>
                      <CloudOutlined style={{ marginRight: '6px' }} />
                      Mainnet
                    </div>
                  ),
                  value: 'mainnet'
                }
              ]}
              block
            />
            <Tag 
              color={currentConfig.color} 
              icon={currentConfig.icon}
              style={{ marginTop: '12px' }}
            >
              {currentConfig.label} Environment Active
            </Tag>
          </div>

          <div className={styles.secureItem}>
            <span className={styles.label}>Admin Username</span>
            <span className={styles.value}>
              admin_{project.name.toLowerCase().replace(/\s+/g, '_')}
            </span>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>Admin Password</span>
            <span className={styles.value}>••••••••••••</span>
            <Button type="link" size="small">Show Password</Button>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>SSH Root Access</span>
            <span className={styles.value}>root@192.168.1.{project.id}</span>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>API Endpoint</span>
            <span className={styles.value}>{currentConfig.endpoint}</span>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>API {currentConfig.label} Key</span>
            <span className={styles.value}>{currentConfig.apiKey}</span>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>Database Instance</span>
            <span className={styles.value}>{currentConfig.database}</span>
          </div>
          <div className={styles.secureItem}>
            <span className={styles.label}>Port</span>
            <span className={styles.value}>{currentConfig.port}</span>
          </div>
          <div className={styles.credentialsActions}>
            <Button onClick={onLock}>Lock Section</Button>
          </div>
        </div>
      )}
    </AdminCard>
  );
};
