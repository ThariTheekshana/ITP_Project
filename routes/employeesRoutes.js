


import express from 'express'
const router = express.Router()
import {
     createEmployee,
     deleteEmployee,
     getAllEmployees,
     updateEmployee,
     showEmployeeStats,
    } from "../controllers/employeesController.js";

router.route('/').post(createEmployee).get(getAllEmployees);
//remember about :id
router.route('/stats').get(showEmployeeStats);
router.route('/:id').delete(deleteEmployee).patch(updateEmployee);
    export default router



