import express from 'express'
const router = express.Router()
import {
    createRepair,
    deleteRepair,
    getAllRepairs,
    updateRepair,
    showRepairStats,
  } from "../controllers/repairsController.js";

router.route('/').post(createRepair).get(getAllRepairs);
//remember about :id
router.route('/stats').get(showRepairStats);
router.route('/:id').delete(deleteRepair).patch(updateRepair);
  export default router



