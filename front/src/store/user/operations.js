import axios from 'axios';
import alertify from 'alertifyjs';
import { sendLog, logOut, setAvatar } from './actions';
import { closeAllModals } from '../modals/operations';
import { deletePosts } from '../posts/actions';
import { clearSubs } from '../subs/actions';


export const checkUser = () => (dispatch, getState) => {

    const {isAuth} = getState().user

    if (isAuth) {
        axios.post("/auth/check", {withCredentials: true}).then((res) => {


            if (!!res.data) {
                dispatch(sendLog(res.data['user']));
            }else{
                dispatch(logOut())
            }
        });
    }
}

export const sendSettingImage = (file) => (dispatch, getState) => {

    const {isLogin} = getState().user

    if (!isLogin) {
        alertify.error('Вы не вошли в аккаунт!');

    }else{

        let formData = new FormData();
        formData.append("image_upload", file);

        axios.post("/users/image/set", formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=1'
            }
        }).then((res) => {

            if (!!res.data && !!res.data['success'] && !!res.data['image']) {
                alertify.success(res.data['success'])
                dispatch(setAvatar(res.data['image']))
                dispatch(closeAllModals())  
            }

        });
    }
}

export const sendLogOut = () => (dispatch) => {

    axios.post("/auth/logout").then(() => {

        dispatch(logOut())
        dispatch(deletePosts())
        dispatch(clearSubs())
    });
}

export const sendRegister = ({values, setError}) => (dispatch) => {

    axios.post("/auth/register", {...values}).then((res) => {
        
        if (!!res.data['error']) {

            for (const key in res.data['error']) {
                setError(key, res.data['error'][key])
                alertify.error(res.data['error'][key]);
            }
            
        }

        if (!!res.data['success']) {
            dispatch(closeAllModals())
            alertify.success(res.data['success']);
            
        }
    });
}

export const sendLogin = ({values, setError}) => (dispatch) => {

    axios.post("/auth/login", {...values}).then((res) => {
        
        
        if (!!res.data['error']) {

            for (const key in res.data['error']) {
                setError(key, res.data['error'][key])
                alertify.error(res.data['error'][key]);
            }
            
        }

        if (!!res.data['success']) {
            dispatch(closeAllModals())    
            dispatch(sendLog(res.data['user']));
            alertify.success(res.data['success']);
            dispatch(deletePosts())
        }
    });
}



