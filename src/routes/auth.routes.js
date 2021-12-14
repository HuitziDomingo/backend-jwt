import { Router } from "express"
import * as AuthController from '../controllers/AuthController'
import { verifySignUP } from "../middlewares"

const router = Router()

router.post('/signup', [
    verifySignUP.checkDuplicateUserNameOrEmail,
    verifySignUP.checkRolesExisted
], AuthController.signUp)
router.post('/signin', AuthController.signIn)

export default router
