import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
import { subscribeAction } from '../store/subs/operations';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    button: {
        minWidth: 'inherit'
    },
    link: {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }
}));

const Sub = ({image, nickname, togglePoint, _id, isSubs}) => {

    const [isSub, setIsSub] = useState(isSubs || false);
    const classes = useStyles();

    const dispatch = useDispatch();

    
    let textSub,
    iconSub

    if (!isSub) {
      textSub = 'Подписаться'
      iconSub = <AddCircleOutlineIcon />
    }else{
      textSub = 'Отписаться'
      iconSub = <RemoveCircleOutlineOutlinedIcon />
    }

    const subAction = () => {
      dispatch(subscribeAction(_id, isSub, setIsSub))
    }

    return ( 
      
        <ListItem button>
          <Link className={classes.link} to={`/user/${_id}`}>
            <ListItemAvatar>
            <Avatar
                aria-label="recipe" 
                src={image}
                className="avatar"
            >
              {nickname[0]}
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={nickname} />
          </Link>
            <ListItemSecondaryAction>
            <Button 
                onClick={subAction}
                variant="contained" 
                className={classes.button} 
                color="secondary">
              {!togglePoint && textSub}
              {togglePoint && iconSub}
            </Button>
            </ListItemSecondaryAction>
        </ListItem>
     );
}
 
export default Sub;