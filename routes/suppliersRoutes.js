


import express from 'express'
const router = express.Router()
import {
     createSupplier,
     deleteSupplier,
     getAllSuppliers,
     updateSupplier,
     showSupplierStats,
    } from "../controllers/suppliersController.js";

router.route('/').post(createSupplier).get(getAllSuppliers);
//remember about :id
router.route('/stats').get(showSupplierStats);
router.route('/:id').delete(deleteSupplier).patch(updateSupplier);
    export default router



