const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');
const khoaRoutes = require('./routes/khoa.routes');
const lopRoutes = require('./routes/lop.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/khoa', khoaRoutes);
app.use('/api/lop', lopRoutes);

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

const PORT = 3000;

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Failed to start server:', error);
} 