const express = require('express');

const jwt = require('jsonwebtoken');

const { execute } = require('../config/database');

const router = express.Router();


// ================= LOGIN ROUTE =================

router.post('/login', async (req, res) => {

  try {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {

      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    let tableName = '';

    switch (role) {

      case 'student':
        tableName = 'students';
        break;

      case 'teacher':
        tableName = 'teachers';
        break;

      case 'parent':
        tableName = 'parents';
        break;

      default:
        return res.status(400).json({
          message: 'Invalid role'
        });
    }

    const users = await execute(
      `SELECT * FROM ${tableName} WHERE email=?`,
      [email]
    );

    if (users.length === 0) {

      return res.status(401).json({
        message: 'User not found'
      });
    }

    const user = users[0];

    if (user.password !== password) {

      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


// ================= REGISTER ROUTE =================

router.post('/register', async (req, res) => {

  try {

    const {
      role,
      name,
      email,
      password,
      student_id,
      department,
      mobile,
      parent_mobile
    } = req.body;

    if (!role || !name || !email || !password) {

      return res.status(400).json({
        message: 'Required fields missing'
      });
    }

    let tableName = '';

    switch (role) {

      case 'student':
        tableName = 'students';
        break;

      case 'teacher':
        tableName = 'teachers';
        break;

      case 'parent':
        tableName = 'parents';
        break;

      default:
        return res.status(400).json({
          message: 'Invalid role'
        });
    }

    // Check Existing User

    const existingUser = await execute(
      `SELECT * FROM ${tableName} WHERE email=?`,
      [email]
    );

    if (existingUser.length > 0) {

      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // STUDENT INSERT

    if (role === 'student') {

      await execute(
        `INSERT INTO students 
        (name, email, password, student_id, department, mobile, parent_mobile)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          email,
          password,
          student_id,
          department,
          mobile,
          parent_mobile
        ]
      );
    }

    // TEACHER INSERT

    if (role === 'teacher') {

      await execute(
        `INSERT INTO teachers 
        (name, email, password, department)
        VALUES (?, ?, ?, ?)`,
        [
          name,
          email,
          password,
          department
        ]
      );
    }

    // PARENT INSERT

    if (role === 'parent') {

      await execute(
        `INSERT INTO parents 
        (name, email, password, mobile)
        VALUES (?, ?, ?, ?)`,
        [
          name,
          email,
          password,
          mobile
        ]
      );
    }

    res.status(201).json({
      message: 'Registration successful'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;