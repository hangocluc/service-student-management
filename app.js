const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');
const khoaRoutes = require('./routes/khoa.routes');
const lopRoutes = require('./routes/lop.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/khoa', khoaRoutes);
app.use('/api/lop', lopRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        code: 500,
        success: false,
        message: 'Something went wrong!',
        errors: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 