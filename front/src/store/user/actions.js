
export const sendLog = (user_info) => ({
    type: 'SEND_LOGIN',
    payload: user_info
})

export const logOut = () => ({
    type: 'SEND_LOGOUT'
})

export const setAvatar = (image) => ({
    type: 'SET_AVATAR',
    payload: image
})

