
export const savePosts = (posts) => ({
    type: 'LOAD_POSTS',
    payload: posts
})

export const prepareUploadFile = (posts) => ({
    type: 'PREPARE_UPLOAD_IMAGE',
    payload: posts
})

export const uploadFile = (posts) => ({
    type: 'UPLOAD_IMAGE',
    payload: posts
})

export const saveLastComment = (payload) => ({
    type: 'SAVE_LAST_COMMENT',
    payload
})

export const saveHasMore = (hasMore) => ({
    type: 'SAVE_HAS_MORE',
    payload: hasMore
})

export const saveAllComments = (payload) => ({
    type: 'SAVE_ALL_COMMENTS',
    payload
})

export const deletePosts = () => ({
    type: 'DELETE_POSTS'
})

export const activatePost = (payload) => ({
    type: 'ACTIVATE_POST',
    payload
})

export const delActivatePost = () => ({
    type: 'DEL_ACTIVATE_POST'
})
