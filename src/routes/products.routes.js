import { Router } from "express"

import * as productController from '../controllers/ProductsController'

import { authJwt } from '../middlewares'

const router = Router()

router.get('/', productController.getProducts)

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProducts)

router.get('/:productId', productController.getProductsById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProductsById)

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductsById)


export default router
