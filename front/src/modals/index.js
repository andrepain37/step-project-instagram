import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UploadPost from './UploadPost';
import UploadUserAvatar from './UploadUserAvatar';
import { Modal, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { closeAllModals } from '../store/modals/operations';
import PostDetails from './PostDetails';
import { delActivatePost } from '../store/posts/actions';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        background: 'linear-gradient(135deg, #000 50%, #fff 50%)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '100%',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
}));

function Modals() {

    const dispatch = useDispatch();

    const modalsActive = useSelector(st => st.modals.active)
    const register = useSelector(st => st.modals.register)
    const login = useSelector(st => st.modals.login)
    const uploadPost = useSelector(st => st.modals.uploadPost)
    const uploadUserAvatar = useSelector(st => st.modals.uploadUserAvatar)
    const postDetails = useSelector(st => st.modals.postDetails)
    const classes = useStyles();
    const styles = {}
    styles.maxWidth = 400

    if (postDetails) {
        styles.maxWidth = 1000;
        styles.maxHeight = 660;
    }

    const handleClose = (delPost) => {
        
        dispatch(closeAllModals())
        if (delPost) {
            dispatch(delActivatePost())
        }
    }

    

    return (
        <Modal
            open={modalsActive}
            onClose={() => handleClose(postDetails)}
        >
            <Paper className={classes.paper} style={{...styles}}>
                <section className="modal">
                    <span className="modal__close" onClick={handleClose}></span>
                    {register && <RegisterForm />}
                    {login && <LoginForm />}
                    {uploadPost && <UploadPost />}
                    {uploadUserAvatar && <UploadUserAvatar />}
                    {postDetails && <PostDetails />}
                </section>
            </Paper>
        </Modal>
    );
}



export default memo(Modals);