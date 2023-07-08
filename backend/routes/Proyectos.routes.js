import express from "express"
import { obtenerProyectos, obtenerProyecto, crearProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador  } from "../controllers/Proyecto.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'

const router = express.Router()

//Solo serán privadas
router.route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, crearProyecto)

router.route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)


router.route('/agregar-colaborador/:id')
    .post(checkAuth, agregarColaborador)

router.route('/eliminar-colaborador/:id')
    .post(checkAuth, eliminarColaborador)

    
export default router;