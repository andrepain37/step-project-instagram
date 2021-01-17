import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import { getSubs } from '../store/subs/operations';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Sub from './Sub';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    marginBottom: '5px',
    maxHeight: '140px',
    overflowX: 'auto'
  },
}));

function SubsList({togglePoint}) {

  

  const classes = useStyles();

  const dispatch = useDispatch();

  const user_subs = useSelector(st => st.subs.user_subs)
  const isLoading = useSelector(st => st.subs.isLoadingSub)
  const isLogin = useSelector(st => st.user.isLogin)


  useEffect(() => {
    if (!user_subs.length && isLoading) {
      dispatch(getSubs())
    }
  }, [dispatch, user_subs, isLoading, isLogin]);

  

  const mySubs = user_subs.map((value) => (
    <Sub key={value._id} isSubs={true} togglePoint={togglePoint} {...value} />
  ))
  

  if (!user_subs.length && isLoading) {
    return <Loader />
  }



return (
  <>
      <Typography variant="h6">
          Ваши подписки:
      </Typography>
      <List dense className={classes.root}>
        {mySubs}
        {!isLoading && !user_subs.length && <p className="center">Вы нинакого не подписаны :(</p>}
      </List>
  </>
);
}

export default SubsList;