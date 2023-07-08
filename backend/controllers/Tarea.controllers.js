import Tarea from '../models/Tarea.model.js'
import Proyecto from '../models/Proyecto.model.js'




// Obtener un tarea
const obtenerTarea = async (req, res) => {

	//Obteniendo Tareas nos trae todos los Tareas
	const { id } = req.params
	
	const tarea = await Tarea.findById(id).populate('proyecto')
	console.log(tarea)

	//Comprobar que existe la tarea		
	if(!tarea) {
		const error = new Error('Tarea no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(tarea.proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para acceder a este tarea');
		return res.status(403).json({ msg: error.message })
	}

	res.json(tarea)

} 


// Crear un nuevo Tarea
const crearTarea = async (req, res) => {

	//1. Comprobamos que el proyecto Existe
	const { proyecto } = req.body
	const existeProyecto = await Proyecto.findById(proyecto)
	if(!existeProyecto) {
		const error = new Error('No se encontró el proyecto');
		return res.status(404).json({ msg: error.message })
	}

	//2. comprobamos que el usuario que esté dada de alta quien creó el proyecto
	if(existeProyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos');
		return res.status(404).json({ msg: error.message })
	}

	// 3 . Insertamos en bbdd
	try {
		const nuevoTarea = await Tarea.create(req.body)
		console.log('Nueva Tarea', nuevoTarea)
		res.json(nuevoTarea)
	} catch (error) {
		error = new Error('No se pudo crear el Tarea');
		return res.status(400).json({ msg: error.message })
	}
	
} 

// Editar un tarea
const editarTarea = async (req, res) => {

	//Obteniendo Tareas nos trae todos los Tareas
	const { id } = req.params
	
	const tarea = await Tarea.findById(id).populate('proyecto')

	//Comprobar que existe la tarea		
	if(!tarea) {
		const error = new Error('Tarea no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(tarea.proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para acceder a este tarea');
		return res.status(403).json({ msg: error.message })
	}

	tarea.nombre = req.body.nombre || tarea.nombre
	tarea.descripion = req.body.descripion || tarea.descripion
	tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega
	tarea.prioridad = req.body.prioridad || tarea.prioridad
	console.log(tarea.descripion)

	try {
		const tareaEditado = await tarea.save()
		res.json(tareaEditado)
		
	} catch (error) {
		error = new Error('No se ha podido modificar el tarea');
		return res.status(401).json({ msg: error.message })
	}

	
} 

// Eliminar un tarea
const eliminarTarea = async (req, res) => {

	//1. Obtenemos el id
	const {id } = req.params
	console.log(id)

	//Miramos si el tarea existe
	const tarea = await Tarea.findById(id).populate('proyecto')
	console.log(tarea)

	if(!tarea) {
		const error = new Error('Tarea no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(tarea.proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para eliminar');
		return res.status(401).json({ msg: error.message })
	}

	try {
		// intentar enviarlo
		await tarea.deleteOne()
		res.json({ msg: 'Tarea eliminado correctamente' })
		
	} catch (error) {
		error = new Error('No se ha podido eliminar el tarea');
		return res.status(401).json({ msg: error.message })
	}
	
} 

// cambiar estado de la tareas
const cambiarEstadoTareas = async (req, res) => {
	console.log('leyendo...')
	
} 



export { obtenerTarea, crearTarea, editarTarea, eliminarTarea, cambiarEstadoTareas}