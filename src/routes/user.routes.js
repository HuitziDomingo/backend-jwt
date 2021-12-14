import { Router } from "express"

import * as userController from '../controllers/UserController'
import { authJwt, verifySignUP } from '../middlewares'

const router = Router()

router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUP.checkRolesExisted
], userController.createUser)

export default router
