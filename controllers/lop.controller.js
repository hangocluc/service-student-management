const Lop = require('../models/lop.model');

exports.getAllLop = async (req, res) => {
    try {
        const lopList = await Lop.findAll();
        res.json({
            status: 'success',
            data: lopList
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getLopById = async (req, res) => {
    try {
        const lop = await Lop.findById(req.params.maLop);
        if (!lop) {
            return res.status(404).json({
                status: 'error',
                message: 'Lop not found'
            });
        }
        res.json({
            status: 'success',
            data: lop
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.createLop = async (req, res) => {
    try {
        const { maLop, tenLop, maKhoa } = req.body;
        if (!maLop || !tenLop || !maKhoa) {
            return res.status(400).json({
                status: 'error',
                message: 'maLop, tenLop, and maKhoa are required'
            });
        }
        const result = await Lop.create({ maLop, tenLop, maKhoa });
        res.status(201).json({
            status: 'success',
            message: 'Lop created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
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