// "use client";

// import React, { useState, useEffect } from 'react';
// import { Row, Col, Statistic, Typography, Button, Tag, Space, Divider, Card, Breadcrumb, Radio, Select, Tooltip, Modal, Form, Input, App } from 'antd';
// import { 
//   CheckCircleOutlined, 
//   CloseCircleOutlined, 
//   ReloadOutlined,
//   FileTextOutlined,
//   HistoryOutlined,
//   BellOutlined,
//   ProjectOutlined,
//   LinkOutlined,
//   ArrowLeftOutlined,
//   AppstoreOutlined,
//   TableOutlined,
//   EyeOutlined,
//   PlusOutlined,
//   DeleteOutlined,
//   GlobalOutlined,
//   BarChartOutlined,
//   CloudUploadOutlined,
//   LockOutlined
// } from '@ant-design/icons';
// import { useTranslations } from 'next-intl';
// import MainLayout from '@/components/layout/MainLayout';
// import AdminCard from '@/components/common/AdminCard';
// import AdminTable from '@/components/common/AdminTable';
// import DeleteSecurityModal from '@/components/common/DeleteSecurityModal';
// import SecurityGateModal from '@/components/common/SecurityGateModal';
// import styles from './projects.module.scss';

// const { Title, Text, Link: AntdLink } = Typography;
// const { Option } = Select;

// const ProjectsPage = () => {
//   const { message, modal } = App.useApp();
//   const t = useTranslations('Projects');
//   const [projects, setProjects] = useState<any[]>([]);
//   const [selectedProject, setSelectedProject] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [checking, setChecking] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
  
//   // Modal state
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [submitting, setSubmitting] = useState(false);

//   // Delete Security State
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [projectToDelete, setProjectToDelete] = useState<any>(null);
//   const [isDeletingFromDetail, setIsDeletingFromDetail] = useState(false);

//   // Secure Details State
//   const [secureModalVisible, setSecureModalVisible] = useState(false);
//   const [isDetailsUnlocked, setIsDetailsUnlocked] = useState(false);

//   // New state for view and filter
//   const [viewType, setViewType] = useState<'card' | 'table'>('card');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
//       const result = await response.json();
//       setProjects(result);
//       setLastSyncTime(new Date());
//     } catch (error) {
//       console.error('Failed to fetch projects:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProjectDetails = async (id: string) => {
//     setLoading(true);
//     setIsDetailsUnlocked(false); // Relock when switching projects
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);
//       const result = await response.json();
//       setSelectedProject(result);
//     } catch (error) {
//       console.error('Failed to fetch project details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setIsMounted(true);
//     fetchProjects();

//     // Auto-sync: Refresh project data every 7 minutes (420000ms)
//     const autoSyncInterval = setInterval(() => {
//       console.log('Auto-sync: Refreshing project data...');
//       message.info('Auto-syncing project data...', 2);
//       fetchProjects();
//       if (selectedProject) {
//         fetchProjectDetails(selectedProject.id);
//       }
//     }, 420000); // 7 minutes

//     return () => clearInterval(autoSyncInterval);
//   }, []);

//   // Re-sync when selected project changes
//   useEffect(() => {
//     if (selectedProject) {
//       const projectSyncInterval = setInterval(() => {
//         console.log(`Auto-sync: Refreshing project ${selectedProject.id}...`);
//         handleCheck(selectedProject.id);
//       }, 420000); // 7 minutes

//       return () => clearInterval(projectSyncInterval);
//     }
//   }, [selectedProject]);

//   const handleCheck = async (id: string) => {
//     setChecking(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/check`);
//       const result = await response.json();
//       setSelectedProject(result);
      
//       // Also refresh the projects list to update the card/table view
//       await fetchProjects();
      
//       message.success('Project synced successfully!');
//     } catch (error) {
//       console.error('Failed to check project status:', error);
//       message.error('Failed to sync project data');
//     } finally {
//       setChecking(false);
//     }
//   };

//   const handleAddProject = async (values: any) => {
//     setSubmitting(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (response.ok) {
//         message.success(t('modal.success'));
//         setIsModalVisible(false);
//         form.resetFields();
//         fetchProjects();
//       } else {
//         message.error('Failed to add website');
//       }
//     } catch (error) {
//       console.error('Add project error:', error);
//       message.error('Connection error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = (id: string, name: string, isDetailView: boolean = false) => {
//     setProjectToDelete({ id, name });
//     setIsDeletingFromDetail(isDetailView);
//     setDeleteModalVisible(true);
//   };

//   const confirmDelete = async () => {
//     if (!projectToDelete) return;

//     setSubmitting(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectToDelete.id}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         message.success(t('delete_confirm.success'));
//         if (isDeletingFromDetail) {
//           setSelectedProject(null);
//         }
//         setDeleteModalVisible(false);
//         setProjectToDelete(null);
//         fetchProjects();
//       } else {
//         message.error('Failed to delete website');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       message.error('Connection error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!isMounted) {
//     return null;
//   }

//   const filteredProjects = projects.filter(p => {
//     if (statusFilter === 'all') return true;
//     return p.status.toLowerCase() === statusFilter.toLowerCase();
//   });

//   const columns = [
//     {
//       title: t('columns.name'),
//       dataIndex: 'name',
//       key: 'name',
//       render: (text: string, record: any) => (
//         <Space direction="vertical" size={0}>
//           <AntdLink href={record.url} target="_blank" style={{ fontSize: '12px' }}>
//             {record.url}
//           </AntdLink>
//           <Text strong>{text}</Text>
//         </Space>
//       )
//     },
//     {
//       title: t('status.country'),
//       dataIndex: 'country',
//       key: 'country',
//       render: (text: string) => <Tag icon={<GlobalOutlined />}>{text}</Tag>
//     },
//     {
//       title: t('status.deployments'),
//       dataIndex: 'deployments',
//       key: 'deployments',
//       render: (text: number) => <Tag color="blue" icon={<CloudUploadOutlined />}>{text}</Tag>
//     },
//     {
//       title: t('columns.status'),
//       dataIndex: 'status',
//       key: 'status',
//       render: (status: string, record: any) => (
//         <Tag color={record.isLive ? 'green' : 'red'}>
//           {record.isLive ? t('status.live') : t('status.issue')} ({status})
//         </Tag>
//       )
//     },
//     {
//       title: t('columns.actions'),
//       key: 'actions',
//       render: (_: any, record: any) => (
//         <Space>
//           <Button 
//             type="primary" 
//             ghost 
//             icon={<EyeOutlined />} 
//             onClick={() => fetchProjectDetails(record.id)}
//           >
//             {t('details_btn')}
//           </Button>
//           <Button 
//             danger 
//             icon={<DeleteOutlined />} 
//             onClick={() => handleDelete(record.id, record.name, false)}
//           />
//         </Space>
//       )
//     }
//   ];

//   const renderProjectList = () => (
//     <div className={styles.projectsContainer}>
//       <div className={styles.headerActions}>
//         <Title level={2} className={styles.title}>{t('title')}</Title>
        
//         <Space size="middle">
//           <Button 
//             type="primary" 
//             icon={<PlusOutlined />} 
//             onClick={() => setIsModalVisible(true)}
//           >
//             {t('add_project')}
//           </Button>

//           <Select 
//             defaultValue="all" 
//             style={{ width: 150 }} 
//             onChange={(value) => setStatusFilter(value)}
//           >
//             <Option value="all">{t('filters.all')}</Option>
//             <Option value="stable">{t('filters.stable')}</Option>
//             <Option value="issue">{t('filters.issue')}</Option>
//           </Select>

//           <Radio.Group 
//             value={viewType} 
//             onChange={(e) => setViewType(e.target.value)}
//             buttonStyle="solid"
//           >
//             <Radio.Button value="card">
//               <Tooltip title={t('view.card')}>
//                 <AppstoreOutlined />
//               </Tooltip>
//             </Radio.Button>
//             <Radio.Button value="table">
//               <Tooltip title={t('view.table')}>
//                 <TableOutlined />
//               </Tooltip>
//             </Radio.Button>
//           </Radio.Group>
//         </Space>
//       </div>

//       {viewType === 'card' ? (
//         <Row gutter={[24, 24]} align="stretch">
//           {filteredProjects.map((project) => (
//             <Col xs={24} sm={12} xl={8} key={project.id}>
//               <Card 
//                 hoverable 
//                 className={styles.projectCard}
//               >
//                 <div className={styles.cardContent}>
//                   <div>
//                     <Text 
//                       ellipsis={{ tooltip: project.url }} 
//                       className={styles.urlLink}
//                       style={{ marginBottom: '4px', display: 'block' }}
//                     >
//                       <AntdLink href={project.url} target="_blank">
//                         <LinkOutlined /> {project.url}
//                       </AntdLink>
//                     </Text>

//                     <div className={styles.cardTitleRow}>
//                       <Title 
//                         level={4} 
//                         ellipsis={{ tooltip: project.name }} 
//                         className={styles.cardTitle}
//                         onClick={() => fetchProjectDetails(project.id)}
//                       >
//                         {project.name}
//                       </Title>
//                       <Tag color={project.isLive ? 'green' : 'red'} className={styles.statusTag}>
//                         {project.isLive ? t('status.live') : t('status.issue')}
//                       </Tag>
//                     </div>
                    
//                     <div className={styles.tagContainer}>
//                        <Tag icon={<GlobalOutlined />} className={styles.countryTag}>{project.country}</Tag>
//                        <Tag color="blue" icon={<CloudUploadOutlined />} className={styles.deploymentTag}>{project.deployments}</Tag>
//                     </div>
//                   </div>

//                   <div className={styles.cardFooter}>
//                      <div className={styles.statusInfo}>
//                         <Text type="secondary" className={styles.statusLabel}>{t('status.stable')}</Text>
//                         <div className={styles.statusValue}>{project.status}</div>
//                      </div>
//                      <Space size="small">
//                         <Tooltip title={t('details_btn')}>
//                           <Button 
//                             type="text" 
//                             shape="circle"
//                             icon={<EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} />} 
//                             onClick={() => fetchProjectDetails(project.id)} 
//                           />
//                         </Tooltip>
//                         <Tooltip title={t('delete_btn')}>
//                           <Button 
//                             type="text" 
//                             shape="circle"
//                             danger 
//                             icon={<DeleteOutlined style={{ fontSize: '18px' }} />} 
//                             onClick={() => handleDelete(project.id, project.name, false)} 
//                           />
//                         </Tooltip>
//                      </Space>
//                   </div>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <AdminCard>
//           <AdminTable 
//             dataSource={filteredProjects} 
//             columns={columns} 
//             rowKey="id"
//           />
//         </AdminCard>
//       )}

//       <Modal
//         title={t('modal.title')}
//         open={isModalVisible}
//         onCancel={() => {
//           setIsModalVisible(false);
//           form.resetFields();
//         }}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleAddProject}
//         >
//           <Form.Item
//             label={t('modal.name')}
//             name="name"
//             rules={[{ required: true, message: 'Please enter website name' }]}
//           >
//             <Input placeholder="e.g. My Awesome Website" />
//           </Form.Item>
//           <Form.Item
//             label={t('modal.url')}
//             name="url"
//             rules={[
//               { required: true, message: 'Please enter website URL' },
//               { type: 'url', message: 'Please enter a valid URL' }
//             ]}
//           >
//             <Input placeholder="https://example.com" />
//           </Form.Item>
//           <Form.Item
//             label={t('status.country')}
//             name="country"
//             rules={[{ required: true, message: 'Please enter hosting country' }]}
//           >
//             <Input placeholder="e.g. United States, India" />
//           </Form.Item>
//           <Form.Item className={styles.modalFooter}>
//             <Space>
//               <Button onClick={() => setIsModalVisible(false)}>
//                 {t('modal.cancel')}
//               </Button>
//               <Button type="primary" htmlType="submit" loading={submitting}>
//                 {t('modal.submit')}
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <DeleteSecurityModal
//         open={deleteModalVisible}
//         onCancel={() => setDeleteModalVisible(false)}
//         onConfirm={confirmDelete}
//         itemName={projectToDelete?.name || ''}
//         loading={submitting}
//       />

//       <SecurityGateModal
//         open={secureModalVisible}
//         onCancel={() => setSecureModalVisible(false)}
//         onSuccess={() => {
//           setSecureModalVisible(false);
//           setIsDetailsUnlocked(true);
//         }}
//         title="Admin Access Required"
//         description={`Please enter your 6-digit security OTP to view sensitive credentials for ${selectedProject?.name}.`}
//         actionText="Unlock Details"
//       />
//     </div>
//   );

//   const renderProjectDetails = () => (
//     <div className={styles.projectsContainer}>
//       <Breadcrumb 
//         style={{ marginBottom: '16px' }}
//         items={[
//           {
//             title: (
//               <AntdLink onClick={() => setSelectedProject(null)}>
//                 <ArrowLeftOutlined /> {t('title')}
//               </AntdLink>
//             )
//           },
//           {
//             title: selectedProject.name
//           }
//         ]}
//       />

//       <div style={{ marginBottom: '16px' }}>
//         <AntdLink href={selectedProject.url} target="_blank" style={{ fontSize: '1rem' }}>
//           <LinkOutlined /> {selectedProject.url}
//         </AntdLink>
//       </div>

//       <div className={styles.detailHeader}>
//         <div>
//           <Title level={2} className={styles.title}>{selectedProject.name}</Title>
//           {lastSyncTime && (
//             <Text type="secondary" style={{ fontSize: '0.85rem' }}>
//               Last synced: {lastSyncTime.toLocaleTimeString()} • Auto-sync: Every 7 min
//             </Text>
//           )}
//         </div>
//         <Space>
//           <Button 
//             danger 
//             icon={<DeleteOutlined />} 
//             onClick={() => handleDelete(selectedProject.id, selectedProject.name, true)}
//           >
//             {t('delete_btn')}
//           </Button>
//           <Button 
//             type="primary" 
//             icon={<ReloadOutlined spin={checking} />} 
//             onClick={() => handleCheck(selectedProject.id)}
//             loading={checking}
//           >
//             {t('status.check_now')}
//           </Button>
//         </Space>
//       </div>
      
//       <Row gutter={[16, 16]}>
//         <Col xs={24} lg={12}>
//           <AdminCard title={t('status.title')}>
//             <div className={styles.statusSection}>
//               {selectedProject.isLive ? (
//                 <>
//                   <CheckCircleOutlined className={styles.mainIcon} style={{ color: '#52c41a' }} />
//                   <Title level={3} className={styles.statusTitle} style={{ color: '#52c41a' }}>{t('status.live')}</Title>
//                   <Tag color="success" className={styles.statusTag}>{selectedProject.status}</Tag>
//                 </>
//               ) : (
//                 <>
//                   <CloseCircleOutlined className={styles.mainIcon} style={{ color: '#ff4d4f' }} />
//                   <Title level={3} className={styles.statusTitle} style={{ color: '#ff4d4f' }}>{t('status.issue')}</Title>
//                   <Tag color="error" className={styles.statusTag}>{selectedProject.status}</Tag>
//                 </>
//               )}
              
//               <div className={styles.analysisBox}>
//                 <Space>
//                   <BarChartOutlined style={{ fontSize: '18px' }} />
//                   <span>
//                     <strong>{t('status.analysis')}:</strong> {selectedProject.analysis}
//                   </span>
//                 </Space>
//               </div>

//               <div className={styles.statsDisplay}>
//                 <Row gutter={[16, 24]}>
//                   <Col span={12}>
//                     <div className={styles.statItem}>
//                       <span className={styles.statLabel}>{t('status.country')}</span>
//                       <span className={styles.statValue}>
//                         <GlobalOutlined className={styles.statIcon} /> {selectedProject.country}
//                       </span>
//                     </div>
//                   </Col>
//                   <Col span={12}>
//                     <div className={styles.statItem}>
//                       <span className={styles.statLabel}>{t('status.deployments')}</span>
//                       <span className={styles.statValue}>
//                         <CloudUploadOutlined className={styles.statIcon} /> {selectedProject.deployments}
//                       </span>
//                     </div>
//                   </Col>
//                   <Col span={12}>
//                     <div className={styles.statItem}>
//                       <span className={styles.statLabel}>{t('status.last_checked')}</span>
//                       <span className={styles.statValue}>
//                         <HistoryOutlined className={styles.statIcon} /> {new Date(selectedProject.lastChecked).toLocaleTimeString()}
//                       </span>
//                     </div>
//                   </Col>
//                   <Col span={12}>
//                     <div className={styles.statItem}>
//                       <span className={styles.statLabel}>{t('status.response_time')}</span>
//                       <span className={styles.statValue}>
//                         {selectedProject.responseTime}
//                       </span>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </div>
//           </AdminCard>
//         </Col>
        
//         <Col xs={24} lg={12}>
//           <AdminCard title={t('features.title')}>
//             <div className={styles.deliverablesGrid}>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <div className={styles.deliverableCard}>
//                     <span className={styles.delivLabel}>{t('features.pages')}</span>
//                     <div className={styles.delivValue}>
//                       <ProjectOutlined className={styles.delivIcon} />
//                       {selectedProject.features.pages}
//                     </div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className={styles.deliverableCard}>
//                     <span className={styles.delivLabel}>{t('features.logs')}</span>
//                     <div className={styles.delivValue}>
//                       <HistoryOutlined className={styles.delivIcon} />
//                       {selectedProject.features.logs}
//                     </div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className={styles.deliverableCard}>
//                     <span className={styles.delivLabel}>{t('features.alerts')}</span>
//                     <div className={styles.delivValue} style={{ color: selectedProject.features.alerts > 0 ? '#ff4d4f' : 'inherit' }}>
//                       <BellOutlined className={styles.delivIcon} />
//                       {selectedProject.features.alerts}
//                     </div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className={styles.deliverableCard}>
//                     <span className={styles.delivLabel}>{t('features.reports')}</span>
//                     <div className={styles.delivValue}>
//                       <FileTextOutlined className={styles.delivIcon} />
//                       {selectedProject.features.reports}
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           </AdminCard>
//         </Col>

//         <Col span={24}>
//           <AdminCard title="Project Credentials & Admin Access" className={styles.credentialsCard}>
//             {!isDetailsUnlocked ? (
//               <div className={styles.lockContent}>
//                 <LockOutlined className={styles.lockIcon} />
//                 <Title level={4} className={styles.lockTitle}>Restricted Access Zone</Title>
//                 <Text className={styles.lockDesc}>
//                   This section contains sensitive information including administrative IDs, passwords, and API keys.
//                 </Text>
//                 <Button 
//                   type="primary" 
//                   size="large" 
//                   onClick={() => setSecureModalVisible(true)}
//                 >
//                   Unlock More Details
//                 </Button>
//               </div>
//             ) : (
//               <div className={styles.secureDataList}>
//                 <div className={styles.secureItem}>
//                   <span className={styles.label}>Admin Username</span>
//                   <span className={styles.value}>admin_{selectedProject.name.toLowerCase().replace(/\s+/g, '_')}</span>
//                 </div>
//                 <div className={styles.secureItem}>
//                   <span className={styles.label}>Admin Password</span>
//                   <span className={styles.value}>••••••••••••</span>
//                   <Button type="link" size="small">Show Password</Button>
//                 </div>
//                 <div className={styles.secureItem}>
//                   <span className={styles.label}>SSH Root Access</span>
//                   <span className={styles.value}>root@192.168.1.{selectedProject.id}</span>
//                 </div>
//                 <div className={styles.secureItem}>
//                   <span className={styles.label}>API Production Key</span>
//                   <span className={styles.value}>PK_PROD_{Math.random().toString(36).substring(7).toUpperCase()}</span>
//                 </div>
//                 <div className={styles.secureItem}>
//                   <span className={styles.label}>Database Instance</span>
//                   <span className={styles.value}>db-cluster-{selectedProject.id}-prod</span>
//                 </div>
//                 <div style={{ marginTop: '24px', textAlign: 'center' }}>
//                   <Button onClick={() => setIsDetailsUnlocked(false)}>Lock Section</Button>
//                 </div>
//               </div>
//             )}
//           </AdminCard>
//         </Col>
//       </Row>
//     </div>
//   );

//   return (
//     <MainLayout>
//       {loading ? (
//         <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>
//       ) : projects.length === 0 ? (
//         <div style={{ padding: '50px', textAlign: 'center' }} className={styles.projectsContainer}>
//           <Title level={4}>No projects found</Title>
//           <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
//             {t('add_project')}
//           </Button>
//         </div>
//       ) : selectedProject ? (
//         renderProjectDetails()
//       ) : (
//         renderProjectList()
//       )}
//     </MainLayout>
//   );
// };

// export default ProjectsPage;
"use client";

import React, { useState } from 'react';
import { Row, Col, Typography, Button, Tag, Space, Breadcrumb, Radio, Select, Tooltip, Modal, Form, Input, App } from 'antd';
import { 
  ReloadOutlined,
  LinkOutlined,
  ArrowLeftOutlined,
  AppstoreOutlined,
  TableOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  GlobalOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import MainLayout from '@/components/layout/MainLayout';
import AdminCard from '@/components/common/AdminCard';
import AdminTable from '@/components/common/AdminTable';
import DeleteSecurityModal from '@/components/common/DeleteSecurityModal';
import SecurityGateModal from '@/components/common/SecurityGateModal';
import { ProjectCard } from '@/components/common/ProjectCard';
import { ProjectDetailsContent } from '@/components/common/ProjectDetailsContent';
import { CredentialsSection } from '@/components/common/CredentialsSection';
import { useProjects, useProjectDetails } from './hooks';
import { projectsApi } from './api';
import { Project, ViewType, StatusFilter } from './types';
import styles from './projects.module.scss';

const { Title, Text, Link: AntdLink } = Typography;
const { Option } = Select;

const ProjectsPage = () => {
  const { message } = App.useApp();
  const t = useTranslations('Projects');
  
  // Use custom hooks
  const { projects, loading, lastSyncTime, fetchProjects } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { project: selectedProject, checking, checkStatus } = useProjectDetails(selectedProjectId);
  
  // UI State
  const [isMounted, setIsMounted] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('card');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  
  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [secureModalVisible, setSecureModalVisible] = useState(false);
  const [isDetailsUnlocked, setIsDetailsUnlocked] = useState(false);
  
  // Form & Submission
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingFromDetail, setIsDeletingFromDetail] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleViewProject = (id: string) => {
    setSelectedProjectId(id);
    setIsDetailsUnlocked(false);
  };

  const handleBackToList = () => {
    setSelectedProjectId(null);
  };

  const handleSync = async () => {
    if (selectedProject) {
      await checkStatus(selectedProject.id, fetchProjects);
    }
  };

  const handleAddProject = async (values: any) => {
    setSubmitting(true);
    try {
      await projectsApi.create(values);
      message.success(t('modal.success'));
      setIsModalVisible(false);
      form.resetFields();
      fetchProjects();
    } catch (error) {
      message.error('Failed to add website');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, name: string, isDetailView: boolean = false) => {
    setProjectToDelete({ id, name });
    setIsDeletingFromDetail(isDetailView);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    setSubmitting(true);
    try {
      await projectsApi.delete(projectToDelete.id);
      message.success(t('delete_confirm.success'));
      if (isDeletingFromDetail) {
        setSelectedProjectId(null);
      }
      setDeleteModalVisible(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (error) {
      message.error('Failed to delete website');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) return null;

  const filteredProjects = projects.filter(p => {
    if (statusFilter === 'all') return true;
    return p.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const tableColumns = [
    {
      title: t('columns.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <Space direction="vertical" size={0}>
          <AntdLink href={record.url} target="_blank" style={{ fontSize: '12px' }}>
            {record.url}
          </AntdLink>
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: t('status.country'),
      dataIndex: 'country',
      key: 'country',
      render: (text: string) => <Tag icon={<GlobalOutlined />}>{text}</Tag>
    },
    {
      title: t('status.deployments'),
      dataIndex: 'deployments',
      key: 'deployments',
      render: (text: number) => <Tag color="blue" icon={<CloudUploadOutlined />}>{text}</Tag>
    },
    {
      title: t('columns.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Project) => (
        <Tag color={record.isLive ? 'green' : 'red'}>
          {record.isLive ? t('status.live') : t('status.issue')} ({status})
        </Tag>
      )
    },
    {
      title: t('columns.actions'),
      key: 'actions',
      render: (_: any, record: Project) => (
        <Space>
          <Button 
            type="primary" 
            ghost 
            icon={<EyeOutlined />} 
            onClick={() => handleViewProject(record.id)}
          >
            {t('details_btn')}
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id, record.name, false)}
          />
        </Space>
      )
    }
  ];

  // Render Project List View
  if (!selectedProject) {
    return (
      <MainLayout>
        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '50px', textAlign: 'center' }} className={styles.projectsContainer}>
            <Title level={4}>No projects found</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              {t('add_project')}
            </Button>
          </div>
        ) : (
          <div className={styles.projectsContainer}>
            <div className={styles.headerActions}>
              <Title level={2} className={styles.title}>{t('title')}</Title>
              
              <Space size="middle">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => setIsModalVisible(true)}
                >
                  {t('add_project')}
                </Button>

                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  <Option value="all">{t('filters.all')}</Option>
                  <Option value="stable">{t('filters.stable')}</Option>
                  <Option value="issue">{t('filters.issue')}</Option>
                </Select>

                <Radio.Group 
                  value={viewType} 
                  onChange={(e) => setViewType(e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="card">
                    <Tooltip title={t('view.card')}>
                      <AppstoreOutlined />
                    </Tooltip>
                  </Radio.Button>
                  <Radio.Button value="table">
                    <Tooltip title={t('view.table')}>
                      <TableOutlined />
                    </Tooltip>
                  </Radio.Button>
                </Radio.Group>
              </Space>
            </div>

            {viewType === 'card' ? (
              <Row gutter={[24, 24]} align="stretch">
                {filteredProjects.map((project) => (
                  <Col xs={24} sm={12} xl={8} key={project.id}>
                    <ProjectCard
                      project={project}
                      onView={handleViewProject}
                      onDelete={(id, name) => handleDelete(id, name, false)}
                      t={t}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <AdminCard>
                <AdminTable 
                  dataSource={filteredProjects} 
                  columns={tableColumns} 
                  rowKey="id"
                />
              </AdminCard>
            )}

            {/* Add Project Modal */}
            <Modal
              title={t('modal.title')}
              open={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}
              footer={null}
            >
              <Form form={form} layout="vertical" onFinish={handleAddProject}>
                <Form.Item
                  label={t('modal.name')}
                  name="name"
                  rules={[{ required: true, message: 'Please enter website name' }]}
                >
                  <Input placeholder="e.g. My Awesome Website" />
                </Form.Item>
                <Form.Item
                  label={t('modal.url')}
                  name="url"
                  rules={[
                    { required: true, message: 'Please enter website URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                  ]}
                >
                  <Input placeholder="https://example.com" />
                </Form.Item>
                <Form.Item
                  label={t('status.country')}
                  name="country"
                  rules={[{ required: true, message: 'Please enter hosting country' }]}
                >
                  <Input placeholder="e.g. United States, India" />
                </Form.Item>
                <Form.Item className={styles.modalFooter}>
                  <Space>
                    <Button onClick={() => setIsModalVisible(false)}>
                      {t('modal.cancel')}
                    </Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                      {t('modal.submit')}
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            {/* Delete Modal */}
            <DeleteSecurityModal
              open={deleteModalVisible}
              onCancel={() => setDeleteModalVisible(false)}
              onConfirm={confirmDelete}
              itemName={projectToDelete?.name || ''}
              loading={submitting}
            />
          </div>
        )}
      </MainLayout>
    );
  }

  // Render Project Details View
  return (
    <MainLayout>
      <div className={styles.projectsContainer}>
        <Breadcrumb 
          style={{ marginBottom: '16px' }}
          items={[
            {
              title: (
                <AntdLink onClick={handleBackToList}>
                  <ArrowLeftOutlined /> {t('title')}
                </AntdLink>
              )
            },
            { title: selectedProject.name }
          ]}
        />

        <div style={{ marginBottom: '16px' }}>
          <AntdLink href={selectedProject.url} target="_blank" style={{ fontSize: '1rem' }}>
            <LinkOutlined /> {selectedProject.url}
          </AntdLink>
        </div>

        <div className={styles.detailHeader}>
          <div>
            <Title level={2} className={styles.title}>{selectedProject.name}</Title>
            {lastSyncTime && (
              <Text type="secondary" style={{ fontSize: '0.85rem' }}>
                Last synced: {lastSyncTime.toLocaleTimeString()} • Auto-sync: Every 7 min
              </Text>
            )}
          </div>
          <Space>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(selectedProject.id, selectedProject.name, true)}
            >
              {t('delete_btn')}
            </Button>
            <Button 
              type="primary" 
              icon={<ReloadOutlined spin={checking} />} 
              onClick={handleSync}
              loading={checking}
            >
              {t('status.check_now')}
            </Button>
          </Space>
        </div>
        
        <ProjectDetailsContent project={selectedProject} t={t} />

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col span={24}>
            <CredentialsSection
              project={selectedProject}
              isUnlocked={isDetailsUnlocked}
              onUnlock={() => setSecureModalVisible(true)}
              onLock={() => setIsDetailsUnlocked(false)}
            />
          </Col>
        </Row>

        {/* Delete Modal */}
        <DeleteSecurityModal
          open={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={confirmDelete}
          itemName={projectToDelete?.name || ''}
          loading={submitting}
        />

        {/* Security Gate Modal */}
        <SecurityGateModal
          open={secureModalVisible}
          onCancel={() => setSecureModalVisible(false)}
          onSuccess={() => {
            setSecureModalVisible(false);
            setIsDetailsUnlocked(true);
          }}
          title="Admin Access Required"
          description={`Please enter your 6-digit security OTP to view sensitive credentials for ${selectedProject.name}.`}
          actionText="Unlock Details"
        />
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
