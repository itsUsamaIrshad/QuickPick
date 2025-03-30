import express from 'express'
import upload from '../middleware/multer.js';
import productController from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';


const { singleProduct, removeProduct, listProduct, addProduct } = productController;

const productRouter =  express.Router();

productRouter.post('/add',adminAuth,upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 } 
]), addProduct);



productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProduct)


export default productRouter;