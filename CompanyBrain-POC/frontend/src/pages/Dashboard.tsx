import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, List, Button, Badge, Avatar } from 'antd';
import { CalendarOutlined, MailOutlined, CheckCircleOutlined, AudioOutlined } from '@ant-design/icons';
import { useList } from '@refinedev/core';

const { Title, Text } = Typography;

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'call' | 'task';
  participants?: string[];
}

interface Email {
  id: string;
  subject: string;
  sender: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  unread: boolean;
}

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const Dashboard: React.FC = () => {
  const [todaysEvents, setTodaysEvents] = useState<CalendarEvent[]>([]);
  const [recentEmails, setRecentEmails] = useState<Email[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Mock data - in real app, fetch from MCPs
    setTodaysEvents([
      {
        id: '1',
        title: 'Q4 Budget Review',
        time: '9:00 AM',
        type: 'meeting',
        participants: ['John Smith', 'Sarah Wilson']
      },
      {
        id: '2',
        title: 'Client Call - TechCorp',
        time: '2:00 PM',
        type: 'call',
        participants: ['Mike Johnson']
      },
      {
        id: '3',
        title: 'Project Status Update',
        time: '4:30 PM',
        type: 'meeting',
        participants: ['Team Alpha']
      }
    ]);

    setRecentEmails([
      {
        id: '1',
        subject: 'Contract Review Required',
        sender: 'legal@company.com',
        time: '30 min ago',
        priority: 'high',
        unread: true
      },
      {
        id: '2',
        subject: 'Q4 Marketing Strategy',
        sender: 'sarah@company.com',
        time: '1 hour ago',
        priority: 'medium',
        unread: true
      },
      {
        id: '3',
        subject: 'Weekly Team Report',
        sender: 'john@company.com',
        time: '2 hours ago',
        priority: 'low',
        unread: false
      }
    ]);

    setPendingTasks([
      {
        id: '1',
        title: 'Review client proposal',
        project: 'TechCorp Deal',
        dueDate: 'Today',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Update financial projections',
        project: 'Q4 Budget',
        dueDate: 'Tomorrow',
        status: 'in-progress'
      },
      {
        id: '3',
        title: 'Schedule team meeting',
        project: 'Project Alpha',
        dueDate: 'This week',
        status: 'pending'
      }
    ]);
  }, []);

  const handleVoiceCommand = () => {
    setIsRecording(!isRecording);
    // In real app, integrate with browser-use MCP for recording
    console.log(isRecording ? 'Stopping recording...' : 'Starting recording...');
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'call': return '📞';
      case 'task': return '📋';
      default: return '📅';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f50';
      case 'medium': return '#fa8c16';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Good morning! Here's your day at a glance.</Title>
        <Button
          type={isRecording ? 'primary' : 'default'}
          icon={<AudioOutlined />}
          size="large"
          onClick={handleVoiceCommand}
          style={{ backgroundColor: isRecording ? '#f50' : undefined }}
        >
          {isRecording ? 'Recording...' : 'Voice Command'}
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {/* Today's Schedule */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined />
                Today's Schedule
              </div>
            }
            style={{ height: '400px' }}
          >
            <List
              dataSource={todaysEvents}
              renderItem={(event) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<div style={{ fontSize: '20px' }}>{getEventIcon(event.type)}</div>}
                    title={event.title}
                    description={
                      <div>
                        <Text type="secondary">{event.time}</Text>
                        {event.participants && (
                          <div style={{ marginTop: '4px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {event.participants.join(', ')}
                            </Text>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Emails */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailOutlined />
                Recent Emails
              </div>
            }
            style={{ height: '400px' }}
          >
            <List
              dataSource={recentEmails}
              renderItem={(email) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge dot={email.unread} color={getPriorityColor(email.priority)}>
                        <Avatar size="small" style={{ backgroundColor: '#1677ff' }}>
                          {email.sender.charAt(0).toUpperCase()}
                        </Avatar>
                      </Badge>
                    }
                    title={
                      <Text strong={email.unread} style={{ fontSize: '14px' }}>
                        {email.subject}
                      </Text>
                    }
                    description={
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {email.sender}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {email.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Pending Tasks */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined />
                Pending Tasks
              </div>
            }
            style={{ height: '400px' }}
          >
            <List
              dataSource={pendingTasks}
              renderItem={(task) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge
                        status={task.status === 'pending' ? 'default' : task.status === 'in-progress' ? 'processing' : 'success'}
                      />
                    }
                    title={
                      <Text style={{ fontSize: '14px' }}>{task.title}</Text>
                    }
                    description={
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {task.project}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          Due: {task.dueDate}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Button type="primary" block>
                  Schedule Meeting
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button block>
                  Create Task
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button block>
                  Search Documents
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button block>
                  View Reports
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};