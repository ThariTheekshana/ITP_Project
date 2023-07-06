import express from 'express'
const router = express.Router()
import {
     createPayment,
     deletePayment,
     getPayments,
     updatePayment,
     showPaymentStats,
    } from "../controllers/paymentsController.js";

router.route('/').post(createPayment).get(getPayments);
//remember about :id
router.route('/stats').get(showPaymentStats);
router.route('/:id').delete(deletePayment).patch(updatePayment);
    export default router



