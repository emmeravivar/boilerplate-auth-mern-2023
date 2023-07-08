import clienteAxios from '../../clienteAxios'

export const saveNewUser = async data => await clienteAxios.post(`/usuarios`, data )
export const sendResetPassword = async email => await clienteAxios.post(`/usuarios/resetear-password/`, email )
export const saveNewPassword = async (token, password) => await clienteAxios.post(`usuarios/resetear-password/${token}`, password)
export const sendLogin= async (data) => await clienteAxios.post(`/usuarios/login`, data)
