const express = require('express');

const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const { testConnection } = require('./config/database');

const authRoutes = require('./routes/auth');
const {authMiddleware, authorizeRoles} = require('./middleware/authMiddleware');

const parentRoutes = require('./routes/parents');
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({
  extended: true
}));

// Static Folder for PDFs

app.use('/uploads', express.static('uploads'));

// Routes

app.use('/api/auth', authRoutes);

app.use('/api/parent', parentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Test Route

app.get('/', (req, res) => {

  res.json({
    message: 'Campus Guide 360 API Running',
    status: 'success'
  });

});

// 404 Handler

app.use((req, res) => {

  res.status(404).json({
    error: 'Route not found'
  });

});

// Global Error Handler

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    error: 'Internal Server Error'
  });

});

// Start Server

const initializeServer = async () => {

  console.log('🔄 Connecting to MySQL...');

  const isConnected = await testConnection();

  if (!isConnected) {

    console.log('❌ Server startup failed');

    process.exit(1);
  }

  app.listen(PORT, () => {

    console.log(
      `✅ Server running on http://localhost:${PORT}`
    );

  });
};

initializeServer();