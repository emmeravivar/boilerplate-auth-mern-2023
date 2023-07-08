import Usuario from '../models/Usuario.model.js'
import crearId from '../helpers/idGenerate.js'
import jwtGenerator from '../helpers/jwtGenerate.js'
import {  emailRegistro, emailRecuperarPassword  } from '../helpers/emails.js'



const crearUsuario = async (req, res) => {
	
	//Enviar mensajes de error
	const { email } = req.body;
	const existeUsuario = await Usuario.findOne({ email }) //<= metodo que encuentra el primero que coincida
	
	if(existeUsuario) {
		const error = new Error('Usuario ya registrado');
		return res.status(403).json({ msg: error.message })
	}

	try {
		//Crear el objeto y almacenarlo
		const usuario = new Usuario(req.body) //req.body es donde está almacenado en obj postman
		console.log(usuario)
		//Generamos el token y añadimos al objeto usuario que hemos creado
		usuario.token = crearId()
		console.log(usuario)
		await usuario.save()

		//Enviar el mail de confirmación
		emailRegistro( {
			email: usuario.email,
			nombre: usuario.nombre,
			token: usuario.token
		})


		res.json(usuario)
	}
	catch (error) {
		error = new Error('No se pudo crear el usuario');
		return res.status(401).json({ msg: error.message })
	}
} 

const autenticar = async (req, res) => {
	

	//Traemos las variables
	const { email, password } = req.body


	// //Saber si el usuario existe
	const usuario = await Usuario.findOne({ email })
	if(!usuario) {
		const error = new Error('Usuario no existe');
		return res.status(400).json({ msg: error.message })
	}


	// Comprobar si el usuario está confirmado
	if(!usuario.confirmado) {
		const error = new Error('Tu cuenta no ha sido confirmada');
		return res.status(403).json({ msg: error.message })
	}


	//Comprobar su password
	if( await usuario.comprobarPassword(password)) {
		res.json( {
			_id: usuario._id,
			nombre: usuario.nombre,
			email: usuario.email,
			token: jwtGenerator(usuario._id)
		})

	} else {
		const error = new Error('El password es incorrecto');
		return res.status(403).json({ msg: error.message })
	}

}

// Función para confirmar la cuenta con el token 
const confirmar = async (req, res) => {

	const { token } = req.params

	//Evaluando el token buscando usuarios con ese token
	const usuarioConfirmar = await Usuario.findOne({ token })
	
	// Si no existe:
	if(!usuarioConfirmar) {
		const error = new Error('El token no es valido');
		return res.status(403).json({ msg: error.message })
	}

	//si existe almacenamos en confirm el true y 
	//eliminamos el token porque va a ser de un solo uso
	try {
		
		usuarioConfirmar.confirmado = true; 
		usuarioConfirmar.token = ''; 
		await usuarioConfirmar.save()
		res.json({ msg: 'Token confirmado'})

	} catch (error) {
		error = new Error('No se ha podido confirmar el token');
		return res.status(403).json({ msg: error.message })

	}
}

const resetearPassword = async (req, res) => {
	
	const { email } = req.body

	// //Saber si el usuario existe
	const usuario = await Usuario.findOne({ email })
	if(!usuario) {
		const error = new Error('Usuario no existe');
		return res.status(400).json({ msg: error.message })
	}

	try {
		usuario.token = crearId(); 
		await usuario.save()
		res.json( { msg: 'Hemos enviado un email con las instrucciones'})

		//Enviar el mail de confirmación
		emailRecuperarPassword( {
			email: usuario.email,
			nombre: usuario.nombre,
			token: usuario.token
		})


	} catch (error) {
		error = new Error('No se ha podido enviar el mail');
		return res.status(403).json({ msg: error.message })
	}


}

const comprobarToken = async (req, res) => {
	
	const { token } = req.params

	const tokenValido = await Usuario.findOne( {token})

	if(tokenValido) {
		res.json( { msg: 'Token valido'})
	} else {
		const error = new Error('Token no valido');
		return res.status(404).json({ msg: error.message })
	}
}

const nuevoPassword = async (req, res) => {

	const { token } = req.params
	const { password } = req.body

	const usuario = await Usuario.findOne( {token})

	if(usuario) {
		usuario.password = password
		usuario.token = ''
			
		try {
			await usuario.save();
			res.json( { msg: 'Contraseña ha sido cambiada correctamente'})
		} catch (error) {
			console.log('Error')
		}
	
	} else {
		const error = new Error('Token no valido');
		return res.status(404).json({ msg: error.message })
	}
}

const perfil = async (req, res) => {
	console.log('Lenyendo...')
	const { Usuario } = req
	res.json(Usuario)
}

export {crearUsuario, autenticar, confirmar, resetearPassword, comprobarToken, nuevoPassword, perfil}