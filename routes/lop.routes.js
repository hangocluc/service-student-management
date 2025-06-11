const express = require('express');
const router = express.Router();
const lopController = require('../controllers/lop.controller');

// Get all Lop
router.get('/', lopController.getAllLop);

// Get Lop by ID
router.get('/:maLop', lopController.getLopById);

// Create new Lop
router.post('/', lopController.createLop);

// Update Lop
router.put('/:maLop', lopController.updateLop);

// Delete Lop
router.delete('/:maLop', lopController.deleteLop);

module.exports = router;