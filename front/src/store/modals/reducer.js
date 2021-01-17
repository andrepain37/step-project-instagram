const initialState = {
    active: false,
    login: false,
    register: false,
    uploadPost: false,
    uploadUserAvatar: false,
    postDetails: false
}

const modals = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_ALL':
            return {...action.payload}
        case 'ACTIVE_REGISTER':
            return {...state, register: true, active: true}
        case 'ACTIVE_LOGIN':
            return {...state, login: true, active: true}
        case 'ACTIVE_UPLOAD_POST':
            return {...state, uploadPost: true, active: true}
        case 'ACTIVE_UPLOAD_USER_AVATAR':
            return {...state, uploadUserAvatar: true, active: true}
        case 'ACTIVE_POST_DETAILS':
            return {...state, postDetails: true, active: true}
        default:
            return state;
    }
}

export default modals;
