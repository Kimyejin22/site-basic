import express from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from './controller.js';

const router = express.Router();  // Router() 대신 express.Router() 사용

//router.get('/', getAllProducts);
//router.post('/', addProduct);
//router.put('/:id', updateProduct);
//router.delete('/:id', deleteProduct);

export default router;