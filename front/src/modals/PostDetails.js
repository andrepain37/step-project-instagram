import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comments from '../components/Comments';
import Post from '../components/Post';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader';

const useStyles = makeStyles((theme) => ({
    wrap: {
      display: 'flex'
    },
}));

function PostDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const postDetails = useSelector(st => st.posts.activePostDetails);
    const classes = useStyles();

    useEffect(() => {
        if (postDetails) {
            setIsLoading(false);
        }
    }, [postDetails]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <Post {...postDetails} props_classes={classes.wrap}> 
            <Comments postId={postDetails.id} lastComments={postDetails.lastComments} isAllComments={true} />
        </Post>
    );
}

export default PostDetails;