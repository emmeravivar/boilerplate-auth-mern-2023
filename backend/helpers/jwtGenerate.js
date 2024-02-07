import jwt from 'jsonwebtoken'

const jwtGenerator = (id) => {
    //Esta función firma de forma asíncrona
    //el payload que le enviemos
    // argumentos: el objeto, llave privada (env) y luego las opciones
    return jwt.sign(  {id},  process.env.JWT_SECRET, {
            expiresIn: "7d"
    })
}

export default jwtGenerator