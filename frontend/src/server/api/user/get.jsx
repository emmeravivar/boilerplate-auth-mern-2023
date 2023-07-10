import clientAxios from '../../clientAxios';

export const confirmNewUser = async token => await clientAxios(`/user/confirm-account/${token}`)
export const confirmNewPassword = async token => await clientAxios(`/user/reset-password/${token}`)
export const getUserProfile = async config => await clientAxios.get(`/user/profile`, config)