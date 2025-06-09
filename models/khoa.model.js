const { khoa } = require('../config/mockDatabase');

class Khoa {
    static async findAll(searchParams = {}) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));

            let filteredKhoa = [...khoa];

            // Search by maKhoa
            if (searchParams.maKhoa) {
                filteredKhoa = filteredKhoa.filter(k =>
                    k.maKhoa.toLowerCase().includes(searchParams.maKhoa.toLowerCase())
                );
            }

            // Search by tenKhoa
            if (searchParams.tenKhoa) {
                filteredKhoa = filteredKhoa.filter(k =>
                    k.tenKhoa.toLowerCase().includes(searchParams.tenKhoa.toLowerCase())
                );
            }

            return filteredKhoa;
        } catch (err) {
            throw err;
        }
    }

    static async findById(maKhoa) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));
            return khoa.find(k => k.maKhoa === maKhoa) || null;
        } catch (err) {
            throw err;
        }
    }

    static async create(khoaData) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));

            // Check if maKhoa already exists
            if (khoa.some(k => k.maKhoa === khoaData.maKhoa)) {
                throw new Error('Mã khoa đã tồn tại');
            }

            const newKhoa = {
                maKhoa: khoaData.maKhoa,
                tenKhoa: khoaData.tenKhoa
            };

            khoa.push(newKhoa);
            return newKhoa;
        } catch (err) {
            throw err;
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