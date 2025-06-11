const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

class Student {
    static async generateNextMaSV(connection) {
        let query = `SELECT MASV FROM SINHVIEN ORDER BY MASV DESC FETCH FIRST 1 ROW ONLY`;

        try {
            const result = await connection.execute(
                query,
                [],
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            let nextSeq = 1;
            if (result.rows && result.rows.length > 0) {
                const lastMaSV = result.rows[0].MASV;
                const numPart = parseInt(lastMaSV.replace(/^SV/, ''), 10);
                if (!isNaN(numPart)) {
                    nextSeq = numPart + 1;
                }
            }

            const nextMaSV = 'SV' + nextSeq.toString().padStart(3, '0');
            return nextMaSV;
        } catch (error) {
            console.error('Error generating next MaSV:', error);
            throw error;
        }
    }

    static async findAll(searchParams = {}) {
        let connection;
        try {
            connection = await getConnection();

            let query = `
                SELECT sv.MASV AS "maSV", 
                       sv.HOTEN AS "hoTen", 
                       sv.NGAYSINH AS "ngaySinh", 
                       sv.GIOITINH AS "gioiTinh", 
                       sv.MALOP AS "maLop", 
                       l.TENLOP AS "tenLop", 
                       k.TENKHOA AS "tenKhoa" 
                FROM SINHVIEN sv 
                LEFT JOIN LOP l ON sv.MALOP = l.MALOP 
                LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA
                WHERE 1=1
            `;

            const bindParams = {};

            if (searchParams.maSV) {
                query += ` AND LOWER(sv.MASV) LIKE LOWER(:maSV)`;
                bindParams.maSV = `%${searchParams.maSV}%`;
            }

            if (searchParams.hoTen) {
                query += ` AND LOWER(sv.HOTEN) LIKE LOWER(:hoTen)`;
                bindParams.hoTen = `%${searchParams.hoTen}%`;
            }

            if (searchParams.maLop) {
                query += ` AND LOWER(sv.MALOP) LIKE LOWER(:maLop)`;
                bindParams.maLop = `%${searchParams.maLop}%`;
            }

            const result = await connection.execute(
                query,
                bindParams,
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            return result.rows || [];
        } catch (error) {
            console.error('Error finding students:', error);
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    static async findById(maSV) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT sv.MASV AS "maSV", 
                        sv.HOTEN AS "hoTen", 
                        sv.NGAYSINH AS "ngaySinh", 
                        sv.GIOITINH AS "gioiTinh", 
                        sv.MALOP AS "maLop", 
                        l.TENLOP AS "tenLop", 
                        k.TENKHOA AS "tenKhoa" 
                 FROM SINHVIEN sv 
                 LEFT JOIN LOP l ON sv.MALOP = l.MALOP 
                 LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA 
                 WHERE sv.MASV = :maSV`,
                { maSV },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows && result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error finding student:', error);
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    static async create(student) {
        let connection;
        try {
            connection = await getConnection();
            const ngaySinhDate = student.ngaySinh ? new Date(student.ngaySinh) : null;

            const result = await connection.execute(
                `INSERT INTO SINHVIEN (MASV, HOTEN, NGAYSINH, GIOITINH, MALOP) 
                 VALUES (:maSV, :hoTen, :ngaySinh, :gioiTinh, :maLop)`,
                {
                    maSV: student.maSV,
                    hoTen: student.hoTen,
                    ngaySinh: ngaySinhDate,
                    gioiTinh: student.gioiTinh,
                    maLop: student.maLop
                },
                { autoCommit: true }
            );
            return { ...student };
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    static async update(maSV, student) {
        let connection;
        try {
            connection = await getConnection();
            const ngaySinhDate = student.ngaySinh ? new Date(student.ngaySinh) : null;

            const result = await connection.execute(
                `UPDATE SINHVIEN 
                 SET HOTEN = :hoTen, 
                     NGAYSINH = :ngaySinh, 
                     GIOITINH = :gioiTinh, 
                     MALOP = :maLop 
                 WHERE MASV = :maSV`,
                {
                    maSV,
                    hoTen: student.hoTen,
                    ngaySinh: ngaySinhDate,
                    gioiTinh: student.gioiTinh,
                    maLop: student.maLop
                },
                { autoCommit: true }
            );
            return { maSV, ...student };
        } catch (error) {
            console.error('Error updating student:', error);
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    static async delete(maSV) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                'DELETE FROM SINHVIEN WHERE MASV = :maSV',
                { maSV },
                { autoCommit: true }
            );
            return { maSV };
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
}

module.exports = Student; 