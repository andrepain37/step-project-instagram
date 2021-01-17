import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto'
  },
}));

function GridListPhoto(props) {
    const classes = useStyles();


    return (
        <GridListTile {...props} style={{...props.style, height: 'auto', padding: '5px'}} className={classes.root}>
        </GridListTile>
    );
}


export default GridListPhoto;