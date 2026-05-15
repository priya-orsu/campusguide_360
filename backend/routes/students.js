const express = require('express');

const { execute } = require('../config/database');

const router = express.Router();

// Get Student Details

router.get('/:studentId', async (req, res) => {

  try {

    const { studentId } = req.params;

    const students = await execute(
      'SELECT * FROM students WHERE student_id=?',
      [studentId]
    );

    if (students.length === 0) {

      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(students[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Get Student Marks

router.get('/:studentId/marks', async (req, res) => {

  try {

    const { studentId } = req.params;

    const marks = await execute(
      'SELECT * FROM marks WHERE student_id=?',
      [studentId]
    );

    res.json(marks);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Get Timetable

router.get('/:studentId/timetable', async (req, res) => {

  try {

    const { studentId } = req.params;

    const students = await execute(
      'SELECT * FROM students WHERE student_id=?',
      [studentId]
    );

    if (students.length === 0) {

      return res.status(404).json({
        message: 'Student not found'
      });
    }

    const student = students[0];

    const timetable = await execute(
      'SELECT * FROM timetables WHERE department=?',
      [student.department]
    );

    res.json(timetable);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

router.get('/:studentId/attendance', async (req, res) => {

  try {

    const { studentId } = req.params;

    const attendance = await execute(

      `SELECT
          students.name,
          attendance.subject_code,
          attendance.total_classes,
          attendance.attended_classes,
          attendance.attendance_percentage

       FROM students

       INNER JOIN attendance

       ON students.student_id = attendance.student_id

       WHERE students.student_id = ?`,

      [studentId]
    );

    res.json(attendance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

router.get('/:studentId/subjects', async (req, res) => {

  try {

    const { studentId } = req.params;

    const subjects = await execute(

      `SELECT
          subjects.subject_code,
          subjects.subject_name

       FROM students

       INNER JOIN subjects

       ON students.department = subjects.department

       WHERE students.student_id = ?`,

      [studentId]
    );

    res.json(subjects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;