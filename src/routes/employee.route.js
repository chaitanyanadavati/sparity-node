"use strict";
const router = require('express').Router();

const { EmployeeController } = require('../controllers');

router.get('/employees', EmployeeController.getEmployees);

module.exports = router;