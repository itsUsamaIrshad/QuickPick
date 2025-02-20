import express from 'express';
import {placeOrder , updateStatus , userOrders , allOrders, placeOrderStripeMethod, verifyStripe}  from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router();


// Admin Features

orderRouter.post('/list' , adminAuth , allOrders)
orderRouter.post('/status' , adminAuth , updateStatus)


// payment features

orderRouter.post('/place' , authUser , placeOrder)
orderRouter.post('/stripe' , authUser , placeOrderStripeMethod)



// user features

orderRouter.post('/userorders' , authUser , userOrders)

// verify payment
orderRouter.post('/verifyStripe' , authUser , verifyStripe)


export default orderRouter;
