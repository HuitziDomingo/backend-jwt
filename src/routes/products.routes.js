import { Router } from "express"

import * as productController from '../controllers/ProductsController'

const router = Router()

router.get('/', productController.getProducts)

router.post('/', productController.createProducts)

router.get('/:productId', productController.getProductsById)

router.put('/:productId', productController.updateProductsById)

router.delete('/:productId', productController.deleteProductsById)


export default router
