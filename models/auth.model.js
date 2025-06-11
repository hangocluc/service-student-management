const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

class Auth {
    static async validateCredentials(username, password) {
        try {
            const testConfig = {
                user: username,
                password: password,
                connectString: process.env.ORACLE_CONNECT_STRING
            };

            let testConnection;
            try {
                testConnection = await oracledb.getConnection(testConfig);

                return {
                    success: true,
                    data: {
                        username: username,
                        role: 'ADMIN'
                    }
                };
            } catch (error) {
                if (error.errorNum === 1017) {
                    return {
                        success: false,
                        error: 'INVALID_CREDENTIALS',
                        message: 'Invalid username or password'
                    };
                } else if (error.errorNum === 1018) {
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