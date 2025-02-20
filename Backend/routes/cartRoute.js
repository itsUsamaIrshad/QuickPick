import express from 'express'
import authUser from '../middleware/auth.js'
import CartControllers from '../controllers/cartControllers.js'

const cartRouter = express.Router()

cartRouter.post('/get' ,authUser, CartControllers.getUserCart)
cartRouter.post('/add' , authUser, CartControllers.addToCart)
cartRouter.post('/update' , authUser, CartControllers.updateCart)


export default cartRouter