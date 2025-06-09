const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

class Auth {
    static async validateCredentials(username, password) {
        try {
            // Try to connect with provided credentials
            const testConfig = {
                user: username,
                password: password,
                connectString: process.env.ORACLE_CONNECT_STRING
            };

            let testConnection;
            try {
                testConnection = await oracledb.getConnection(testConfig);

                // If connection successful, return success
                return {
                    success: true,
                    data: {
                        username: username,
                        role: 'ADMIN' // Since they can connect to DB, they're admin
                    }
                };
            } catch (error) {
                // Check specific Oracle error codes
                if (error.errorNum === 1017) { // ORA-01017: invalid username/password
                    return {
                        success: false,
                        error: 'INVALID_CREDENTIALS',
                        message: 'Invalid username or password'
                    };
                } else if (error.errorNum === 1018) { // ORA-01018: user not found
                    return {
                        success: false,
                        error: 'USER_NOT_FOUND',
                        message: 'User not found'
                    };
                } else {
                    throw error;
                }
            } finally {
                if (testConnection) {
                    await testConnection.close();
                }
            }
        } catch (error) {
            console.error('Error validating credentials:', error);
            throw error;
        }
    }
}

module.exports = Auth; 