import Post from '../components/Post';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadPosts } from '../store/posts/operations';
import Loader from '../components/Loader';
import SubsList from '../components/SubsList';
import RecSubsList from '../components/RecSubsList';
import Comments from '../components/Comments';
import useBreakpoint from '../theme/useBreakpoint';




function HomePosts({queries}) {


    const dispatch = useDispatch()

    const posts = useSelector(st => st.posts.posts)
    const hasMore = useSelector(st => st.posts.hasMore)
    const isLogin = useSelector(st => st.user.isLogin)


    useEffect(() => {
        if (!posts.length) {
            dispatch(loadPosts())
        }
    }, [posts, dispatch]);


    const allPosts = posts.map((e, i) => {
        return (
            <Post key={e.id}  {...posts[i]}>
                <Comments lastComments={e.lastComment} postId={e.id}></Comments>
            </Post>
        )
    })


    const matchPoints = useBreakpoint(queries);

    return (
        <section className="home-container">
            <div className={`posts${!isLogin ? '-max' : ''}`}>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => dispatch(loadPosts())}
                    hasMore={hasMore}
                    endMessage={<p className="center">Постов нету :(</p>}
                    loader={<Loader/>}
                >
                    {allPosts}
                </InfiniteScroll>
            </div>
            {isLogin &&
                <div className="subs">
                    <SubsList togglePoint={!!matchPoints && matchPoints.toggle} />
                    <RecSubsList togglePoint={!!matchPoints && matchPoints.toggle} />
                </div>
            }
        </section>
    );
}

export default HomePosts;