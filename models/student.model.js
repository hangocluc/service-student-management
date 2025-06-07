const { students } = require('../config/mockDatabase');

class Student {
    static async create(student) {
        try {
            // Check if student already exists
            const existingStudent = students.find(s => s.maSV === student.maSV);
            if (existingStudent) {
                throw new Error('Student with this MaSV already exists');
            }

            students.push(student);
            return student;
        } catch (error) {
            throw error;
        }
    }

    static async update(maSV, studentData) {
        try {
            const index = students.findIndex(s => s.maSV === maSV);
            if (index === -1) {
                throw new Error('Student not found');
            }

            students[index] = {
                ...students[index],
                ...studentData,
                maSV: maSV // Ensure MaSV doesn't change
            };

            return students[index];
        } catch (error) {
            throw error;
        }
    }

    static async delete(maSV) {
        try {
            const index = students.findIndex(s => s.maSV === maSV);
            if (index === -1) {
                throw new Error('Student not found');
            }

            const deletedStudent = students[index];
            students.splice(index, 1);
            return deletedStudent;
        } catch (error) {
            throw error;
        }
    }

    static async findById(maSV) {
        try {
            const student = students.find(s => s.maSV === maSV);
            if (!student) {
                throw new Error('Student not found');
            }
            return student;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            return students;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Student; 