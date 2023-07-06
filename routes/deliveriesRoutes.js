import express from 'express'

const router = express.Router()

import {
    createDelivery, 
    getAllDeliveries, 
    updateDelivery, 
    deleteDelivery, 
    showDeliveryStats,
} from "../controllers/deliveriesController.js";

router.route('/').post(createDelivery).get(getAllDeliveries);
router.route('/stats').get(showDeliveryStats);
router.route('/:id').delete(deleteDelivery).patch(updateDelivery);

export default router