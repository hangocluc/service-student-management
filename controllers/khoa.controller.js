const Khoa = require('../models/khoa.model');

exports.getAllKhoa = async (req, res) => {
    try {
        const searchParams = {
            maKhoa: req.query.maKhoa,
            tenKhoa: req.query.tenKhoa
        };

        const khoaList = await Khoa.findAll(searchParams);
        res.json({
            success: true,
            code: 200,
            message: null,
            data: khoaList
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

exports.getKhoaById = async (req, res) => {
    try {
        const khoa = await Khoa.findById(req.params.maKhoa);
        if (!khoa) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Khoa not found',
                data: null
            });
        }
        res.json({
            success: true,
            code: 200,
            message: null,
            data: khoa
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

exports.createKhoa = async (req, res) => {
    try {
        const { maKhoa, tenKhoa } = req.body;
        if (!maKhoa || !tenKhoa) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'maKhoa and tenKhoa are required',
                data: null
            });
        }
        const result = await Khoa.create({ maKhoa, tenKhoa });
        res.status(201).json({
            success: true,
            code: 201,
            message: 'Khoa created successfully',
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

exports.updateKhoa = async (req, res) => {
    try {
        const { tenKhoa } = req.body;
        if (!tenKhoa) {
            return res.status(400).json({
                status: 'error',
                message: 'tenKhoa is required'
            });
        }
        const result = await Khoa.update(req.params.maKhoa, { tenKhoa });
        if (result.rowsAffected === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Khoa not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Khoa updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.deleteKhoa = async (req, res) => {
    try {
        const result = await Khoa.delete(req.params.maKhoa);
        if (result.rowsAffected === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Khoa not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Khoa deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}; 