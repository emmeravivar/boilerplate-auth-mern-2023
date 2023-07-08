import express from "express"
import { obtenerTarea, crearTarea, editarTarea, eliminarTarea, cambiarEstadoTareas } from "../controllers/Tarea.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'

const router = express.Router()

//Solo serán privadas
router.route('/')
    .post(checkAuth, crearTarea)

router.route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, editarTarea)
    .delete(checkAuth, eliminarTarea)



router.route('estado/:id')
    .post(checkAuth, cambiarEstadoTareas)

    
export default router;