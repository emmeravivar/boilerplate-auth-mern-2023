import clientAxios from '../../clientAxios'

export const sendNewUser = async data => await clientAxios.post(`/user`, data )
export const sendResetPassword = async email => await clientAxios.post(`/user/reset-password/`, email )
export const sendNewPassword = async (token, password) => await clientAxios.post(`user/reset-password/${token}`, password)
export const sendLogin= async (data) => await clientAxios.post(`/user/login`, data)
