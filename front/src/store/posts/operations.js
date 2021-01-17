import alertify from 'alertifyjs';
import axios from 'axios';
import { saveHasMore, saveLastComment, savePosts, saveAllComments, activatePost } from './actions';

export const loadPosts = () => (dispatch, getState) => {

    const {posts, page, hasMore} = getState().posts

    if (hasMore) {
        axios.post("/posts", {page}).then((res) => {
            if (!!res.data) {
                dispatch(savePosts(posts.concat(res.data)));
            }else{
                dispatch(saveHasMore(false))
            }
        });
    }
    
}

export const loadOnePost = (postId) => (dispatch, getState) => {


    axios.post("/posts/one", {postId}).then((res) => {
        if (!!res.data) {
            dispatch(activatePost(res.data));
        }
    });
    
    
}

export const uploadImage = (file) => () => {
    
    let formData = new FormData();
    formData.append("image_upload", file);

    axios.post("/posts/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data;boundary=1'
        }
    }).then((res) => {

        if (!!res.data) {
            if(!!res.data['success']){
                alertify.success(res.data['success']);
            }
        }

    });
}

export const likePost = (postId, isLike) => (dispatch, getState) => {

    const {isLogin} = getState().user

    if (!isLogin) {
        alertify.error('Вы не вошли в аккаунт!');

    }else{
        axios.post("/posts/like", {postId, isLike}).then((res) => {

            if (!!res.data) {
                if(!!res.data['error']){
                    alertify.error(res.data['error']);
                }
            }
        });
    }
}

export const commentPost = ({postId, comment, resetValue}) => (dispatch, getState) => {

    const {isLogin, user_info} = getState().user

    if (!isLogin) {
        alertify.error('Вы не вошли в аккаунт');
    }else{
        axios.post("/posts/comment", {postId, comment}).then((res) => {

            if (!!res.data) {
                if(!!res.data['success']){
                    alertify.success(res.data['success']);
                    dispatch(saveLastComment(
                        {postId, newComment: {
                            comment, name: user_info.nickname, id: res.data.id
                        }}
                    ));
                    resetValue();
                }
                if(!!res.data['error']){
                    alertify.error(res.data['error']);
                }
            }
        });
    }
}

export const getComments = (postId) => (dispatch) => {

    axios.post("/posts/comments", {postId}).then((res) => {

        if (!!res.data) {
            if(!!res.data['comments']){
                dispatch(saveAllComments({
                    comments: res.data['comments'], postId
                }));

            }
        }
    });
    
}
