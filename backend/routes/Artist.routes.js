import express from "express"
import { } from "../controllers/User.controllers.js";



const router = express.Router()

//Area Pública en react
router.get('/artist/') // End point que trae un listado de todos los artistas
router.get('/artist/:id') //End point que trae la información del artista

//Rutas privadas
router.post('/create-new-artist') //Endpoint que crea un nuevo artista
router.get('/edit-artist/:id',) //Endpoint que edita el artista

export default router;