import express from "express"
import { crearUsuario, autenticar, confirmar, resetearPassword,comprobarToken, nuevoPassword, perfil  } from "../controllers/Usuario.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'


const router = express.Router()

//Area Pública en react
router.post("/", crearUsuario)
router.post("/login", autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/resetear-password', resetearPassword)
router.route( '/resetear-password/:token' ).get(comprobarToken).post(nuevoPassword)

//Rutas privadas
router.get('/perfil', checkAuth, perfil)

export default router;