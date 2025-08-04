import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export const Profile: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Profile</Title>
        <p>Profile page - Coming soon!</p>
      </Card>
    </div>
  );
};