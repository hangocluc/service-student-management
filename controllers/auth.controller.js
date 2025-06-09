const Auth = require('../models/auth.model');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                code: 400,
                error: 'MISSING_CREDENTIALS',
                message: 'Username and password are required',
                data: null
            });
        }

        const result = await Auth.validateCredentials(username, password);

        if (!result.success) {
            return res.status(401).json({
                success: false,
                code: 401,
                error: result.error,
                message: result.message,
                data: null
            });
        }

        res.status(200).json({
            success: true,
            code: 200,
            message: 'Login successful',
            data: {
                username: result.data.USERNAME,
                role: result.data.ROLE
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            code: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
            data: null
        });
    }
}; 