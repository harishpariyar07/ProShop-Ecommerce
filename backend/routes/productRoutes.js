import express from "express";
import asyncHandler from "express-async-handler"
import Product from '../models/productModel.js'
import { getProducts, getProductById, updateProduct, createProduct, deleteProduct, createProductReview, getTopProducts } from "../controllers/productControllers.js";
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id/review').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router