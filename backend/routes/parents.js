const express = require('express');

const { execute } = require('../config/database');

const router = express.Router();

// Parent Dashboard

router.get('/:mobile/student', async (req, res) => {

  try {

    const { mobile } = req.params;

    const students = await execute(
      'SELECT * FROM students WHERE parent_mobile=?',
      [mobile]
    );

    if (students.length === 0) {

      return res.status(404).json({
        message: 'No student found'
      });
    }

    const student = students[0];

    const marks = await execute(
      'SELECT * FROM marks WHERE student_id=?',
      [student.student_id]
    );

    const attendance = await execute(
      'SELECT * FROM attendance WHERE student_id=?',
      [student.student_id]
    );

    res.json({
      student,
      marks,
      attendance
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;