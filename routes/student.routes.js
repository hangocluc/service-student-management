const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a single student by MaSV
router.get('/:maSV', studentController.getStudent);

// Update a student
router.put('/:maSV', studentController.updateStudent);

// Delete a student
router.delete('/:maSV', studentController.deleteStudent);


module.exports = router; 