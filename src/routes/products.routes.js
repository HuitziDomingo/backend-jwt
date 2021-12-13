import { Router } from "express"

import * as productController from '../controllers/ProductsController'

import { verifyToken } from '../middlewares'

const router = Router()

router.get('/', productController.getProducts)

router.post('/', verifyToken, productController.createProducts)

router.get('/:productId', productController.getProductsById)

router.put('/:productId', verifyToken, productController.updateProductsById)

router.delete('/:productId', verifyToken, productController.deleteProductsById)


export default router
