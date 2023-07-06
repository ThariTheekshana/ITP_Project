
import express from 'express'
const router = express.Router()
import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    updateCustomer,
    showCustomerStats,
} from "../controllers/customersController.js";

router.route('/').post(createCustomer).get(getAllCustomers);
//remember about :id
router.route('/stats').get(showCustomerStats);
router.route('/:id').delete(deleteCustomer).patch(updateCustomer);
export default router



