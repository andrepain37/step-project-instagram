const initialState = {
    recomends_subs: [],
    user_subs: [],
    isLoadingRec: true,
    isLoadingSub: true,
}

const subs = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECOMEND_SUBS':
            return {...state, recomends_subs: action.payload, isLoadingRec: false}
        case 'SAVE_SUBS':
            return {...state, user_subs: action.payload, isLoadingSub: false}
        case 'CLEAR_SUBS':
            return {...initialState}
        default:
            return state;
    }
}

export default subs;
