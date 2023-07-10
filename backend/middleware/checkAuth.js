import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

//comprobará que el token sea correcto
//que sea válido
//que no esté expirado
const checkAuth = async (req, res, next) => {

    let token = ''

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {

            //estraemos el JWT de lo que le enviamos al server
            token = req.headers.authorization.split(" ")[1]

            //decodificamos
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            
            req.User = await User.findById(decoded.id).select('-password -tokenConfirm -token -createdAt -updatedAt -__v')
            console.log(req.User)
            return next()

        } catch (error) {
            return res.status(404).json({ msg: 'hubo un error'})
        }
    }

    if(!token) {
        const error = new Error('token no valido')
		return res.status(401).json({ msg:  error.message })
    }
    next()
}

export default checkAuth