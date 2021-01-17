import {loadOnePost} from '../posts/operations';
import { closeAll, activeRegister, activeLogin, activeUploadPost, activeUploadUserAvatar, activePostDetails } from './actions';

export const closeAllModals = () => (dispatch, getState) => {

    const all_modals = getState().modals

    for (const key in all_modals) {
        all_modals[key] = false;
    }

    dispatch(closeAll(all_modals));
}

export const activateRegister = () => (dispatch) => {

    dispatch(activeRegister());
}

export const activateUploadPost = () => (dispatch) => {

    dispatch(activeUploadPost());
}

export const activateLogin = () => (dispatch) => {

    dispatch(activeLogin());
}

export const activateUploadUserAvatar = () => (dispatch) => {
    
    dispatch(activeUploadUserAvatar());
}

export const activatePostDetails = (postId) => (dispatch) => {
    dispatch(loadOnePost(postId));
    dispatch(activePostDetails());
}

