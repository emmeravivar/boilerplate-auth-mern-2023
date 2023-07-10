import nodemailer from 'nodemailer'

export const emailConfirmNewUserToken = async (datos) => {
    const { email, userName, token } = datos


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from:'"EM - Administrador" <cuentas@cuentas-es>',
        to: email,
        subject: "Eva confirma tu cuenta",
        text: 'Comprueba tu cuenta',
        html: `
            <p>Hola ${userName} comprueba tu cuenta.</p>
            <a href=${process.env.FRONTEND_URL}/confirm-account/${token}>Confirmar cuenta</a>
            <p>Ignora este email si no eres tú.</p>        
        `
    })
}

export const emailResetPassword = async (datos) => {
    const { email, userName, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from:'"EM - Administrador" <cuentas@cuentas-es>',
        to: email,
        subject: "Eva Restablece tu passsword",
        text: 'Comprueba tu cuenta',
        html: `
            <p>Hola ${userName} resetea tu passaword.</p>
            <a href=${process.env.FRONTEND_URL}/reset-password/${token}>Restablecer Password</a>
            <p>Ignora este email si no eres tú.</p>
        `
    })
}