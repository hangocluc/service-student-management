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

    static async create(student) {
        let connection;
        try {
            connection = await getConnection();

            const newMaSV = await this.generateNextMaSV(connection);

            const ngaySinhDate = student.ngaySinh ? new Date(student.ngaySinh) : null;

            const result = await connection.execute(
                `INSERT INTO SINHVIEN (MASV, HOTEN, NGAYSINH, GIOITINH, MALOP) 
                 VALUES (:masv, :hoten, :ngaysinh, :gioitinh, :malop)`,
                {
                    masv: newMaSV, // Use generated maSV
                    hoten: student.hoTen,
                    ngaysinh: ngaySinhDate, 
                    gioitinh: student.gioiTinh,
                    malop: student.maLop
                },
                { autoCommit: true }
            );
            return { maSV: newMaSV, ...student };
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
                 SET HOTEN = :hoten, 
                     NGAYSINH = :ngaysinh, 
                     GIOITINH = :gioitinh, 
                     MALOP = :malop 
                 WHERE MASV = :masv`,
                {
                    masv: maSV,
                    hoten: student.hoTen,
                    ngaysinh: ngaySinhDate, 
                    gioitinh: student.gioiTinh,
                    malop: student.maLop
                },
                { autoCommit: true }
            );
            return result;
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
                'DELETE FROM SINHVIEN WHERE MASV = :masv',
                { masv: maSV },
                { autoCommit: true }
            );
            return result;
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
                `SELECT sv.MASV AS "maSV", sv.HOTEN AS "hoTen", sv.NGAYSINH AS "ngaySinh", sv.GIOITINH AS "gioiTinh", sv.MALOP AS "maLop", l.TENLOP AS "tenLop", k.TENKHOA AS "tenKhoa" 
                 FROM SINHVIEN sv 
                 LEFT JOIN LOP l ON sv.MALOP = l.MALOP 
                 LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA 
                 WHERE sv.MASV = :masv`,
                { masv: maSV },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows && result.rows.length > 0 ? result.rows[0] : null;
        } finally {
             if (connection) {
                await connection.close();
            }
        }
    }

    static async findAll() {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT sv.MASV AS "maSV", sv.HOTEN AS "hoTen", sv.NGAYSINH AS "ngaySinh", sv.GIOITINH AS "gioiTinh", sv.MALOP AS "maLop", l.TENLOP AS "tenLop", k.TENKHOA AS "tenKhoa" 
                 FROM SINHVIEN sv 
                 LEFT JOIN LOP l ON sv.MALOP = l.MALOP 
                 LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA`,
                 [], // no bind variables
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows || [];
        } finally {
             if (connection) {
                await connection.close();
            }
        }
    }

    static async getStudentScores(maSV) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT d.MASV AS "maSV", d.MAMH AS "maMH", d.DIEM AS "diem", d.HOCKY AS "hocKy", d.NAMHOC AS "namHoc", m.TENMH AS "tenMH", m.SOTINCHI AS "soTinChi" 
                 FROM DIEM d 
                 JOIN MONHOC m ON d.MAMH = m.MAMH 
                 WHERE d.MASV = :masv`,
                { masv: maSV },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows || [];
        } finally {
             if (connection) {
                await connection.close();
            }
        }
    }

    static async getStudentCourses(maSV) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT dk.ID AS "id", dk.MASV AS "maSV", dk.MAMON AS "maMon", dk.HOCKY AS "hocKy", dk.NAMHOC AS "namHoc", m.TENMH AS "tenMH", m.SOTINCHI AS "soTinChi" 
                 FROM DANGKYMONHOC dk 
                 JOIN MONHOC m ON dk.MAMON = m.MAMH 
                 WHERE dk.MASV = :masv`,
                { masv: maSV },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            return result.rows || [];
        } finally {
             if (connection) {
                await connection.close();
            }
        }
    }
}

module.exports = Student; 