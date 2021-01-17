import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../store/posts/operations';
require('moment/locale/ru');


const useStyles = makeStyles((theme) => ({
  '@keyframes likeOnBg-anim': {  
    '0%': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(1)'
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(3)'
    },
  },
  card: {
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '100%',
    cursor: 'pointer'
  },
  like: {
    transition: '.3s'
  },
  likeOnBg: {
    transition: '.2s',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1)',
    pointerEvents: 'none',
    color: '#ff3b3bc2',
    opacity: 0,
  },
  likeOnBgActive: {
    animation: '$likeOnBg-anim 200ms linear',
    transform: 'translate(-50%, -50%) scale(3)',
    opacity: 1
  },
  likeActive: {
    color: '#ff3b3b'
  },
  content: {
    padding: 0,
    position: 'relative'
  },
  formodal: {
    flex: 1
  }
}));

export default function Post(props) {

  const {id, likes, image, user, liked, children, date, props_classes} = props

  
  const formatDate = Moment(date).format('DD MMMM YYYY HH:mm');

  const classes = useStyles();
  const dispatch = useDispatch();

  const isLogin = useSelector(st => st.user.isLogin)

  const [like, setLike] = React.useState(liked);
  const [likeBg, setLikeBg] = React.useState(false);
  const [countLike, setCountLike] = React.useState(likes);


  useEffect(() => {
    if (likeBg) {
      const interval = setInterval(() => {
        setLikeBg(false);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [likeBg]);

  


  const addToLike = () => {
    if (isLogin) {
      if (like !== true) {
        togglecountLike(like, true);
      }
      setLike(true);
      setLikeBg(true);
    }
    
  };

  const togglecountLike = (like) => {
    if (isLogin) {
      if (!like) {
        setCountLike(countLike + 1);
      }else{
        setCountLike(countLike - 1);
      }
    }
    
    dispatch(likePost(id, !like));
    

  }

  const addToLikeToggle = () => {
    if (isLogin) {
      setLike(!like);
    }
    togglecountLike(like);
  };


  return (
    <Card className={[classes.card, props_classes].join(' ')}>
      <div className={classes.formodal}>
        <CardHeader
          avatar={        
            <Avatar
                aria-label="recipe" 
                src={user.image}
                className="avatar"
            >
              {user.nickname[0]}
            </Avatar>
          }
          title={user.nickname}
          subheader={formatDate}
        />
        <CardContent className={classes.content}>
          <CardMedia
            className={classes.media}
            onDoubleClick={addToLike}
            image={image}
          />
          <IconButton
            className={clsx(classes.likeOnBg, {
              [classes.likeOnBgActive]: likeBg,
            })}
          >
            <FavoriteIcon />
          </IconButton>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton 
          aria-label="add to favorites"
          className={clsx(classes.like, {
            [classes.likeActive]: like,
          })}
          onClick={addToLikeToggle}
          aria-expanded={like}
        >
          <FavoriteIcon />
        </IconButton>
        <span>{countLike} отметок "Нравится"</span>
      </CardActions>
      </div>
      <CardActions className={classes.formodal} disableSpacing>
          {children}
      </CardActions>

    </Card>
  );
}
