const Lop = require('../models/lop.model');

exports.getAllLop = async (req, res) => {
    try {
        const searchParams = {
            maLop: req.query.maLop,
            tenLop: req.query.tenLop,
            maKhoa: req.query.maKhoa
        };

        const lopList = await Lop.findAll(searchParams);
        res.json({
            success: true,
            code: 200,
            message: null,
            data: lopList
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

exports.getLopById = async (req, res) => {
    try {
        const lop = await Lop.findById(req.params.maLop);
        if (!lop) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Lop not found',
                data: null
            });
        }
        res.json({
            success: true,
            code: 200,
            message: null,
            data: lop
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

exports.createLop = async (req, res) => {
    try {
        const { maLop, tenLop, maKhoa } = req.body;
        if (!maLop || !tenLop || !maKhoa) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'maLop, tenLop, and maKhoa are required',
                data: null
            });
        }
        const result = await Lop.create({ maLop, tenLop, maKhoa });
        res.status(201).json({
            success: true,
            code: 201,
            message: 'Lop created successfully',
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

exports.updateLop = async (req, res) => {
    try {
        const { tenLop, maKhoa } = req.body;
        if (!tenLop || !maKhoa) {
            return res.status(400).json({
                status: 'error',
                message: 'tenLop and maKhoa are required'
            });
        }
        const result = await Lop.update(req.params.maLop, { tenLop, maKhoa });
        if (result.rowsAffected === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Lop not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Lop updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.deleteLop = async (req, res) => {
    try {
        const result = await Lop.delete(req.params.maLop);
        if (result.rowsAffected === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Lop not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Lop deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}; 