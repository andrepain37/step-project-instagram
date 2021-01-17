import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import alertify from 'alertifyjs';
import Loader from './Loader';
import { Avatar, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { subscribeAction } from '../store/subs/operations';

const useStyles = makeStyles((theme) => ({
    header: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginBottom: '5px',
      display: 'flex'
    },
    avatar: {
        width: '100px',
        height: '100px',
        fontSize: '40px'
    },
    second: {
        marginLeft: '30px'
    }
}));


function HeaderUser({userId}) {


    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSub, setIsSub] = useState(false);

    const getUserInfo = (userId) => {
        axios.post('/subs/info', {userId}).then((res) => {
            if (!!res.data) {
                if(!!res.data['error']){
                    alertify.error(res.data['error']);
                }
                if(!!res.data['info']){
                    setUserInfo(res.data['info']);
                    setIsSub(res.data['info']['isSub']);
                    setIsLoading(false)
                }
            }
        });
    }

    useEffect(() => {
        getUserInfo(userId)
    }, [userId]);

    const {nickname, image} = userInfo

    const classes = useStyles();


    const dispatch = useDispatch();

    const subAction = () => {
        dispatch(subscribeAction(userId, isSub, setIsSub))    
    }


    if (isLoading) {
        return <Loader />
    }



    let textSub;
    if (!isSub) {
        textSub = 'Подписаться'
    }else{
        textSub = 'Отписаться'
    }

  


    return (
        <section className={classes.header}> 
            <Avatar
                aria-label="recipe" 
                src={image}
                className={`avatar ${classes.avatar}`}
            >
              {nickname[0]}
            </Avatar>
            <div className={classes.second}>
                <Typography variant="h3">
                    {nickname}
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={subAction}
                >
                    {textSub}
                </Button>
            </div>
        </section>
    );
}

export default HeaderUser;