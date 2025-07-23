import React, { useState, useEffect } from 'react';
import './TerraSync-Platform-Visualization.css';

const TerraSync = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const technologies = [
    { name: 'Robotic Mowers', icon: '🤖', brands: ['Husqvarna', 'KRESS', 'Nexmow', 'Korechi'] },
    { name: 'Irrigation', icon: '💧', brands: ['Rain Bird IQ', 'Toro Lynx'] },
    { name: 'Drones', icon: '🚁', brands: ['Surveying', 'Monitoring'] },
    { name: 'Specialized Equipment', icon: '⚙️', brands: ['Ball Pickers', 'Line Painters'] }
  ];

  const features = [
    { icon: '🗺️', title: 'Map-Based Control', desc: 'Visual property management with Acreage Mapper™' },
    { icon: '🧠', title: 'AI Coordination', desc: 'Intelligent scheduling across all equipment' },
    { icon: '📊', title: 'Real-Time Analytics', desc: 'Performance monitoring and ROI optimization' },
    { icon: '👥', title: 'Unified Dashboard', desc: 'Single interface for all maintenance operations' }
  ];

  const metrics = [
    { value: '62', label: 'Acres Under Management', color: '#10b981' },
    { value: '$5K', label: 'Monthly Revenue', color: '#3b82f6' },
    { value: '0.27%', label: 'Market Penetration', color: '#f59e0b' },
    { value: '370x', label: 'Growth Potential', color: '#ef4444' }
  ];

  return (
    <div className="terrasync-visualization">
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-area">
            <div className="logo-circle">
              <span className="logo-icon">🌱</span>
            </div>
            <h1 className="platform-title">TerraSync</h1>
            <p className="platform-subtitle">AI-Powered Grounds Maintenance Automation Platform</p>
          </div>
          
          <div className="hero-description">
            <p>The world's first integrated grounds maintenance automation platform that connects, coordinates, and optimizes all aspects of property maintenance through a unified intelligence layer.</p>
          </div>
        </div>
      </div>

      <div className="platform-overview">
        <div className="section-header">
          <h2>Platform Architecture</h2>
          <p>How TerraSync connects all your maintenance technologies</p>
        </div>

        <div className="architecture-diagram">
          <div className="center-hub">
            <div className="hub-circle">
              <div className="hub-icon">🎯</div>
              <div className="hub-title">TerraSync Hub</div>
              <div className="hub-subtitle">Unified Control</div>
            </div>
            
            <div className="connection-lines">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className={`connection-line line-${index + 1} ${animationStep === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="technology-nodes">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className={`tech-node node-${index + 1} ${animationStep === index ? 'active' : ''}`}
              >
                <div className="tech-icon">{tech.icon}</div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-brands">
                  {tech.brands.map((brand, i) => (
                    <span key={i} className="brand-tag">{brand}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Revolutionary capabilities that transform grounds maintenance</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="metrics-section">
        <div className="section-header">
          <h2>Current Performance</h2>
          <p>Real-time platform metrics and growth trajectory</p>
        </div>
        
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ backgroundColor: metric.color, width: `${(index + 1) * 25}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="value-proposition">
        <div className="value-content">
          <div className="value-header">
            <h2>The TerraSync Advantage</h2>
            <p>Why TerraSync is the future of grounds maintenance</p>
          </div>
          
          <div className="value-points">
            <div className="value-point">
              <div className="value-icon">🎯</div>
              <div className="value-text">
                <h3>Only Integrated Platform</h3>
                <p>Competitors sell individual tools; TerraSync provides the complete solution</p>
              </div>
            </div>
            
            <div className="value-point">
              <div className="value-icon">🧠</div>
              <div className="value-text">
                <h3>AI Orchestration</h3>
                <p>Intelligent coordination across all equipment types with predictive analytics</p>
              </div>
            </div>
            
            <div className="value-point">
              <div className="value-icon">📈</div>
              <div className="value-text">
                <h3>Proven ROI</h3>
                <p>$59/acre/month with 200%+ margin of safety on conservative projections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <div className="section-header">
          <h2>Technical Foundation</h2>
          <p>Built on modern, scalable technology stack</p>
        </div>
        
        <div className="tech-categories">
          <div className="tech-category">
            <h3>Frontend</h3>
            <div className="tech-items">
              <span className="tech-item">React & Vite</span>
              <span className="tech-item">Map-Based UI</span>
              <span className="tech-item">Real-Time Updates</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h3>Backend</h3>
            <div className="tech-items">
              <span className="tech-item">Google Firebase</span>
              <span className="tech-item">Firestore Database</span>
              <span className="tech-item">Cloud Functions</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h3>Integration</h3>
            <div className="tech-items">
              <span className="tech-item">OAuth 2.0</span>
              <span className="tech-item">API Management</span>
              <span className="tech-item">WebSocket Feeds</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h3>Infrastructure</h3>
            <div className="tech-items">
              <span className="tech-item">Vercel Hosting</span>
              <span className="tech-item">GitHub CI/CD</span>
              <span className="tech-item">Stripe Billing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerraSync;