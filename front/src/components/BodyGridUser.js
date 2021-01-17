import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';

import axios from 'axios';
import alertify from 'alertifyjs';
import Loader from './Loader';
import GridListPhoto from './GridListPhoto';
import { useDispatch } from 'react-redux';
import { activatePostDetails } from '../store/modals/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    width: '100%',
    maxHeight: '280px',
    height: '100%'
  },
  list: {
    width: '100%'
  },
  details: {
    position: 'absolute',
    background: '#1a191991',
    zIndex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    fontSize: '20px',
    transition: '.3s',
    opacity: 0,
    cursor: 'pointer',
    '&:hover': {
        opacity: 1,
     },
  }
}));

function BodyGridUser({userId}) {
  const classes = useStyles();

    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getUserPosts = (userId) => {
        axios.post('/users/posts', {userId}).then((res) => {
            if (!!res.data) {
                if(!!res.data['error']){
                    alertify.error(res.data['error']);
                }
                if(!!res.data['posts']){
                    setUserPosts(res.data['posts']);
                    setIsLoading(false)
                }
            }
        });
    }

    const dispatch = useDispatch();

    const getPost = (postId) => {
        dispatch(activatePostDetails(postId));
    }

    useEffect(() => {
        getUserPosts(userId)
    }, [userId]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={classes.root}>
        {!!userPosts.length && 
        <GridList cols={3} className={classes.list}>
            {userPosts.map((post) => (
            <GridListPhoto key={post._id} cols={1} onClick={() => getPost(post._id)}>
                <div className={classes.details}>
                    <span>{post.likes}<FavoriteIcon /></span>
                    <span>{post.comments}<ChatBubbleIcon />   </span>              
                </div>
                <img className={classes.img} src={post.image} alt={'Post №' + post._id} />
            </GridListPhoto>
            ))}
        </GridList>
        }
        {!userPosts.length && 'У пользователя ещё нет постов!'}
        </div>
    );
}


export default BodyGridUser;