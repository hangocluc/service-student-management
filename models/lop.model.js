const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

class Lop {
    static async findAll() {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT l.MALOP as "maLop", l.TENLOP as "tenLop", l.MAKHOA as "maKhoa", k.TENKHOA as "tenKhoa"
                 FROM Lop l
                 LEFT JOIN Khoa k ON l.MAKHOA = k.MAKHOA`,
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

    static async findById(maLop) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT l.MALOP as "maLop", l.TENLOP as "tenLop", l.MAKHOA as "maKhoa", k.TENKHOA as "tenKhoa"
                 FROM Lop l
                 LEFT JOIN Khoa k ON l.MAKHOA = k.MAKHOA
                 WHERE l.MALOP = :maLop`,
                [maLop],
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

    static async create(lopData) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO Lop (MALOP, TENLOP, MAKHOA)
                 VALUES (:maLop, :tenLop, :maKhoa)`,
                [lopData.maLop, lopData.tenLop, lopData.maKhoa],
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

    static async update(maLop, lopData) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `UPDATE Lop 
                 SET TENLOP = :tenLop, MAKHOA = :maKhoa 
                 WHERE MALOP = :maLop`,
                [lopData.tenLop, lopData.maKhoa, maLop],
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

    static async delete(maLop) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM Lop WHERE MALOP = :maLop`,
                [maLop],
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

module.exports = Lop; 