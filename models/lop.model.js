const { lop, khoa } = require('../config/mockDatabase');

class Lop {
    static async findAll(searchParams = {}) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));

            let filteredLop = [...lop];

            // Search by maLop
            if (searchParams.maLop) {
                filteredLop = filteredLop.filter(l =>
                    l.maLop.toLowerCase().includes(searchParams.maLop.toLowerCase())
                );
            }

            // Search by tenLop
            if (searchParams.tenLop) {
                filteredLop = filteredLop.filter(l =>
                    l.tenLop.toLowerCase().includes(searchParams.tenLop.toLowerCase())
                );
            }

            // Search by maKhoa
            if (searchParams.maKhoa) {
                filteredLop = filteredLop.filter(l =>
                    l.maKhoa.toLowerCase().includes(searchParams.maKhoa.toLowerCase())
                );
            }

            // Add tenKhoa to each lop
            filteredLop = filteredLop.map(l => {
                const khoaInfo = khoa.find(k => k.maKhoa === l.maKhoa);
                return {
                    ...l,
                    tenKhoa: khoaInfo ? khoaInfo.tenKhoa : null
                };
            });

            return filteredLop;
        } catch (err) {
            throw err;
        }
    }

    static async findById(maLop) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));
            const lopInfo = lop.find(l => l.maLop === maLop);

            if (!lopInfo) return null;

            // Add tenKhoa
            const khoaInfo = khoa.find(k => k.maKhoa === lopInfo.maKhoa);
            return {
                ...lopInfo,
                tenKhoa: khoaInfo ? khoaInfo.tenKhoa : null
            };
        } catch (err) {
            throw err;
        }
    }

    static async create(lopData) {
        try {
            // Simulate database delay
            await new Promise(resolve => setTimeout(resolve, 100));

            // Check if maLop already exists
            if (lop.some(l => l.maLop === lopData.maLop)) {
                throw new Error('Mã lớp đã tồn tại');
            }

            // Check if maKhoa exists
            if (!khoa.some(k => k.maKhoa === lopData.maKhoa)) {
                throw new Error('Mã khoa không tồn tại');
            }

            const newLop = {
                maLop: lopData.maLop,
                tenLop: lopData.tenLop,
                maKhoa: lopData.maKhoa
            };

            lop.push(newLop);
            return newLop;
        } catch (err) {
            throw err;
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