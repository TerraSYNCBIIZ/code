import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Mock user database
const users = [
  {
    id: '1',
    email: 'demo@companybrain.com',
    password: '$2a$12$demo.hashed.password.here', // "demo"
    name: 'Demo User',
    role: 'employee'
  }
];

router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    console.log('Extracted email:', email, 'password:', password);

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password (for demo, just check if it's "demo")
    if (password !== 'demo') {
      console.log('Password mismatch. Expected: demo, got:', password);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true });
});

router.get('/me', (req, res) => {
  // In real app, verify JWT token
  res.json({
    id: '1',
    email: 'demo@companybrain.com',
    name: 'Demo User',
    role: 'employee'
  });
});

export { router as authRouter };