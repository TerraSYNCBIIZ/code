import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export const Settings: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Settings</Title>
        <p>Settings page - Coming soon!</p>
      </Card>
    </div>
  );
};