const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

class Khoa {
    static async findAll() {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT MAKHOA as "maKhoa", TENKHOA as "tenKhoa" FROM Khoa`,
                [],
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows;
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    static async findById(maKhoa) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT MAKHOA as "maKhoa", TENKHOA as "tenKhoa" 
                 FROM Khoa 
                 WHERE MAKHOA = :maKhoa`,
                [maKhoa],
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    static async create(khoaData) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO Khoa (MAKHOA, TENKHOA) 
                 VALUES (:maKhoa, :tenKhoa)`,
                [khoaData.maKhoa, khoaData.tenKhoa],
                { autoCommit: true }
            );
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    static async update(maKhoa, khoaData) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `UPDATE Khoa 
                 SET TENKHOA = :tenKhoa 
                 WHERE MAKHOA = :maKhoa`,
                [khoaData.tenKhoa, maKhoa],
                { autoCommit: true }
            );
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    static async delete(maKhoa) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM Khoa 
                 WHERE MAKHOA = :maKhoa`,
                [maKhoa],
                { autoCommit: true }
            );
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}

module.exports = Khoa; 