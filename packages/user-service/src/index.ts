import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

dotenv.config();

const prisma = new PrismaClient();
const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'http://212.109.198.24:4173'
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('🔍 Incoming request Origin:', origin);

    if (!origin) {
      console.log('⚠️ No origin provided (maybe curl or same-origin)');
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origin allowed:', origin);
      return callback(null, true);
    }

    console.warn('❌ Origin BLOCKED by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.use(express.json());

// registration
app.post('/api/users/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed } });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
  res.json({ token });
});

// auth middleware
function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/', (_req, res) => {
  res.json({ service: 'user-service' });
});

// protected test route
app.get('/api/users/me', auth, async (req, res) => {
  const userId = (req as any).user.userId;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } });
  res.json(user);
});

const port = process.env.PORT || 3000;
console.log('✅ Server initialized');
app.listen(port, () => console.log('user-service listening on ' + port));
