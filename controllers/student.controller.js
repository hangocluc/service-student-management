const Student = require('../models/student.model');

exports.createStudent = async (req, res) => {
    try {
        const student = req.body;
        const result = await Student.create(student);
        res.status(201).json({
            success: true,
            code: 201,
            message: 'Student created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { maSV } = req.params;
        const student = req.body;
        const result = await Student.update(maSV, student);
        res.status(200).json({
            success: true,
            code: 200,
            message: 'Student updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { maSV } = req.params;
        const result = await Student.delete(maSV);
        res.status(200).json({
            success: true,
            code: 200,
            message: 'Student deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const { maSV } = req.params;
        const student = await Student.findById(maSV);
        if (!student) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Student not found',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: null,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const searchParams = {
            maSV: req.query.maSV,
            hoTen: req.query.hoTen,
            maLop: req.query.maLop
        };

        const students = await Student.findAll(searchParams);
        res.status(200).json({
            success: true,
            code: 200,
            message: null,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.getStudentScores = async (req, res) => {
    try {
        const { maSV } = req.params;
        const data = await Student.getStudentScores(maSV);
        res.status(200).json({
            success: true,
            code: 200,
            message: null,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
};

exports.getStudentCourses = async (req, res) => {
    try {
        const { maSV } = req.params;
        const data = await Student.getStudentCourses(maSV);
        res.status(200).json({
            success: true,
            code: 200,
            message: null,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null
        });
    }
}; 