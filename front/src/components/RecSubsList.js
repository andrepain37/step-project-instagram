import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import { getRecomends } from '../store/subs/operations';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader'
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

function RecSubsList({togglePoint}) {
  const classes = useStyles();
  
  const dispatch = useDispatch();

  
  const recomends_subs = useSelector(st => st.subs.recomends_subs)
  const isLoading = useSelector(st => st.subs.isLoadingRec)
  const isLogin = useSelector(st => st.user.isLogin)

  
  useEffect(() => {
    if (!recomends_subs.length && isLoading) {
      dispatch(getRecomends())
    }
  }, [dispatch, recomends_subs, isLoading, isLogin]);




  const subsRecomend = recomends_subs.map((value) => (
    <Sub key={value._id} togglePoint={togglePoint} {...value} />
  ))
  


  if (!recomends_subs.length && isLoading) {
    return <Loader />
  }


  return (
    <>
    {!isLoading && !!recomends_subs.length &&
      <>
        <Typography variant="h6">
          Рекомендуемые:
        </Typography>
        <List dense className={classes.root}>
          {subsRecomend}
        </List> 
      </>
    }
    </>
  );
}


export default RecSubsList;