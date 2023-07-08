import Proyecto from '../models/Proyecto.model.js'
import Tarea from '../models/Tarea.model.js'



//Obtener todos los proyectos
const obtenerProyectos = async (req, res) => {

	//Obteniendo proyectos nos trae todos los proyectos
	const proyectos = await Proyecto.find().where('creador').equals(req.Usuario)
	res.json(proyectos)
	
} 

// Obtener un proyecto
const obtenerProyecto = async (req, res) => {

	//Obteniendo proyectos nos trae todos los proyectos
	const {id } = req.params
	console.log(id)

	//Miramos si el proyecto existe
	const proyecto = await Proyecto.findById(id)

	if(!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para acceder a este proyecto');
		return res.status(401).json({ msg: error.message })
	}

	//Obtener las tareas del proyecto
	const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
	

	res.json({proyecto, tareas})
	
} 


// Crear un nuevo Proyecto
const crearProyecto = async (req, res) => {

	// Creamos el objeto con el nuevo proyecto
	const proyecto = new Proyecto(req.body)

	//añadimos el creador
	proyecto.creador = req.Usuario._id

	try {
		// intentar enviarlo
		const nuevoProyecto = await proyecto.save()
		res.json({nuevoProyecto})
	} catch (error) {
		error = new Error('No se pudo crear el Proyecto');
		return res.status(400).json({ msg: error.message })
	}
	
} 

// Editar un proyecto
const editarProyecto = async (req, res) => {
	//Obteniendo proyectos nos trae todos los proyectos
	const {id } = req.params
	console.log(id)

	//Miramos si el proyecto existe
	const proyecto = await Proyecto.findById(id)

	if(!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para acceder a este proyecto');
		return res.status(401).json({ msg: error.message })
	}

	proyecto.nombre = req.body.nombre || proyecto.nombre
	proyecto.cliente = req.body.cliente || proyecto.cliente
	proyecto.fechaentrega = req.body.fechaentrega || proyecto.fechaentrega
	proyecto.descripcion = req.body.descripcion || proyecto.descripcion

	try {
		// intentar enviarlo
		const proyectoEditado = await proyecto.save()
		res.json(proyectoEditado)
		
	} catch (error) {
		error = new Error('No se ha podido modificar el proyecto');
		return res.status(401).json({ msg: error.message })
	}

	
} 

// Eliminar un proyecto
const eliminarProyecto = async (req, res) => {
		//Obteniendo proyectos nos trae todos los proyectos
	const {id } = req.params
	console.log(id)

	//Miramos si el proyecto existe
	const proyecto = await Proyecto.findById(id)

	if(!proyecto) {
		const error = new Error('Proyecto no encontrado');
		return res.status(404).json({ msg: error.message })
	}

	//Comprobar el usuario autenticado
	if(proyecto.creador.toString() !== req.Usuario._id.toString()) {
		const error = new Error('No tienes permisos para eliminar');
		return res.status(401).json({ msg: error.message })
	}


	try {
		// intentar enviarlo
		await proyecto.deleteOne()
		res.json({ msg: 'Proyecto eliminado correctamente' })
		
	} catch (error) {
		error = new Error('No se ha podido eliminar el proyecto');
		return res.status(401).json({ msg: error.message })
	}
	
} 




// Agregar colaborador
const agregarColaborador = async (req, res) => {
	console.log('leyendo...')
	
} 

// Eliminar colaborador
const eliminarColaborador = async (req, res) => {
	

	
} 





export { obtenerProyectos, obtenerProyecto, crearProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador}