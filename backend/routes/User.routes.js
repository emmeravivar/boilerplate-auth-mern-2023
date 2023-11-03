import express from "express"
import { createNewUser, authUser, confirmTokenUser, resetPassword, checkTokenUser, newPassword, userProfile, otherProfile } from "../controllers/User.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'


const router = express.Router()

//Area Pública en react
router.post("/", createNewUser)
router.post("/login", authUser)
router.get('/confirm-account/:token', confirmTokenUser)
router.post('/reset-password', resetPassword)
router.route( '/reset-password/:token' )
    .get(checkTokenUser)
    .post(newPassword)

//Rutas privadas
router.get('/profile', checkAuth, userProfile)
router.get('/user-profile', checkAuth, otherProfile)
export default router;