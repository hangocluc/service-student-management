const Khoa = require('../models/khoa.model');

exports.getAllKhoa = async (req, res) => {
    try {
        const khoaList = await Khoa.findAll();
        res.json({
            status: 'success',
            data: khoaList
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getKhoaById = async (req, res) => {
    try {
        const khoa = await Khoa.findById(req.params.maKhoa);
        if (!khoa) {
            return res.status(404).json({
                status: 'error',
                message: 'Khoa not found'
            });
        }
        res.json({
            status: 'success',
            data: khoa
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.createKhoa = async (req, res) => {
    try {
        const { maKhoa, tenKhoa } = req.body;
        if (!maKhoa || !tenKhoa) {
            return res.status(400).json({
                status: 'error',
                message: 'maKhoa and tenKhoa are required'
            });
        }
        const result = await Khoa.create({ maKhoa, tenKhoa });
        res.status(201).json({
            status: 'success',
            message: 'Khoa created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
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