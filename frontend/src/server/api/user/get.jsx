import clienteAxios from '../../clienteAxios';

export const confirmNewUser = async token => await clienteAxios(`/usuarios/confirmar/${token}`)
export const confirmNewPassword = async token => await clienteAxios(`/usuarios/resetear-password/${token}`)
export const getUserProfile = async config => await clienteAxios(`/usuarios/perfil`, config)