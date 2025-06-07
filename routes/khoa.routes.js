const express = require('express');
const router = express.Router();
const khoaController = require('../controllers/khoa.controller');

// Get all Khoa
router.get('/', khoaController.getAllKhoa);

// Get Khoa by ID
router.get('/:maKhoa', khoaController.getKhoaById);

// Create new Khoa
router.post('/', khoaController.createKhoa);

// Update Khoa
router.put('/:maKhoa', khoaController.updateKhoa);

// Delete Khoa
router.delete('/:maKhoa', khoaController.deleteKhoa);

module.exports = router; 