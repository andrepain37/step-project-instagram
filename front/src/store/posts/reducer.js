const initialState = {
    posts: [],
    page: 1,
    hasMore: true,
    activePostDetails: null
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            return {...state, posts: action.payload, page: state.page + 1}
        case 'UPLOAD_IMAGE':
            return {...state, selectedFile: null}
        case 'SAVE_HAS_MORE':
            return {...state, hasMore: action.payload}
        case 'SAVE_ALL_COMMENTS': 
            const refreshCommentsPost = state.posts.map(post => {
                const newPost = {...post}

                if (newPost.id === action.payload.postId) {
                    newPost.lastComment = action.payload.comments
                }
                return newPost;
            })
            return {...state, posts: refreshCommentsPost}
        case 'SAVE_LAST_COMMENT':
            const refreshPost = state.posts.map(post => {
                const newPost = {...post}

                if (newPost.id === action.payload.postId) {
                    newPost.lastComment.push(action.payload.newComment)
                }
                return newPost;
            })
            return {...state, posts: refreshPost}
        case 'DELETE_POSTS':
            return {hasMore: true, posts: [], page: 1, activePostDetails: null}
        case 'ACTIVATE_POST':
            return {...state, activePostDetails: action.payload}    
        case 'DEL_ACTIVATE_POST': 
            return {...state, activePostDetails: null} 
        default:
            return state;
    }
}

export default posts;
