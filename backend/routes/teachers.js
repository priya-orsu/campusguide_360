const express = require('express');

const multer = require('multer');

const path = require('path');

const { execute } = require('../config/database');

const router = express.Router();

// Multer Storage

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, 'uploads/timetables');
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage
});

// Get All Students

router.get('/students/all', async (req, res) => {

  try {

    const students = await execute(
      'SELECT * FROM students'
    );

    res.json(students);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Add Marks

router.post('/marks', async (req, res) => {

  try {

    const {
      student_id,
      subject_name,
      mid1,
      mid2,
      semester_marks
    } = req.body;

    await execute(
      `INSERT INTO marks
      (student_id, subject_name, mid1, mid2, semester_marks)
      VALUES (?, ?, ?, ?, ?)`,
      [
        student_id,
        subject_name,
        mid1,
        mid2,
        semester_marks
      ]
    );

    res.json({
      message: 'Marks added successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Add Attendance

router.post('/attendance', async (req, res) => {

  try {

    const {
      student_id,
      subject_code,
      total_classes,
      attended_classes,
      attendance_percentage
    } = req.body;

    await execute(
      `INSERT INTO attendance
      (student_id, subject_code, total_classes,
      attended_classes, attendance_percentage)
      VALUES (?, ?, ?, ?, ?)`,
      [
        student_id,
        subject_code,
        total_classes,
        attended_classes,
        attendance_percentage
      ]
    );

    res.json({
      message: 'Attendance added successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Upload Timetable

router.post(
  '/upload-timetable',
  upload.single('pdf'),
  async (req, res) => {

    try {

      const {
        department,
        uploaded_by
      } = req.body;

      await execute(
        `INSERT INTO timetables
        (department, pdf_file, uploaded_by)
        VALUES (?, ?, ?)`,
        [
          department,
          req.file.filename,
          uploaded_by
        ]
      );

      res.json({
        message: 'Timetable uploaded'
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: 'Server error'
      });
    }
  }
);

module.exports = router;