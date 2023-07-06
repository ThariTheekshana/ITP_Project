import express from 'express'
const router = express.Router()
import {
     createWarranty,
     deleteWarranty,
     getAllWarranties,
     updateWarranty,
     showWarrantyStats,
    } from "../controllers/warrantiesController.js";

router.route('/').post(createWarranty).get(getAllWarranties);
//remember about :id
router.route('/stats').get(showWarrantyStats);
router.route('/:id').delete(deleteWarranty).patch(updateWarranty);
    export default router



