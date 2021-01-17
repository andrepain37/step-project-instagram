import alertify from 'alertifyjs';
import axios from 'axios';
import { getRecomendSubs, saveSubs } from './actions';

export const getRecomends = () => (dispatch, getState) => {

    const {isLogin} = getState().user


    if (isLogin) {
        axios.post("/subs/recomends").then((res) => {

            if (!!res.data && !!res.data['subs']) {
                dispatch(getRecomendSubs(res.data['subs']))
            }
        });
    }
}

export const getSubs = () => (dispatch, getState) => {

    const {isLogin} = getState().user


    if (isLogin) {
        axios.post("/subs/get").then((res) => {

            if (!!res.data && !!res.data['subs']) {
                dispatch(saveSubs(res.data['subs']))
            }
        });
    }
}

export const subscribeAction = (userId, isSub, setSub) => (dispatch, getState) => {

    const {isLogin} = getState().user

    const subAction = isSub ? 'unsub' : 'sub'


    if (isLogin && userId) {
        axios.post(`/subs/action/${subAction}`, {userId}).then((res) => {
            if (!!res.data) {
                if (!!res.data['error']) {
                    alertify.error(res.data['error'])
                }
                if (!!res.data['sub']) {
                    setSub(!isSub)
                }
            }
            
        });
    }

}



