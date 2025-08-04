import React from 'react';
import { 
  LoginPage as AntdLoginPage,
  LoginFormTypes 
} from '@refinedev/antd';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <AntdLoginPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@companybrain.com",
          password: "demo",
        },
      }}
      title={
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, color: '#1677ff' }}>
            🧠 CompanyBrain
          </Title>
          <Text type="secondary">AI Employee Assistant</Text>
        </div>
      }
      renderContent={(content: React.ReactNode) => (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card
            style={{
              width: 400,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            {content}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Demo Credentials (pre-filled):
                </Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Text code style={{ fontSize: '11px' }}>
                  📧 demo@companybrain.com
                </Text>
                <Text code style={{ fontSize: '11px' }}>
                  🔑 demo
                </Text>
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              marginTop: '24px', 
              paddingTop: '16px', 
              borderTop: '1px solid #f0f0f0' 
            }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Your personalized AI assistant for business operations
              </Text>
            </div>
          </Card>
        </div>
      )}
    />
  );
};