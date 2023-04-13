import express from "express";
import asyncHandler from "express-async-handler"
import Product from '../models/productModel.js'
import { getProducts, getProductById, updateProduct, createProduct } from "../controllers/productControllers.js";
import { deleteProduct } from "../controllers/productControllers.js";
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router