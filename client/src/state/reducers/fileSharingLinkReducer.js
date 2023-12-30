const fileSharingLinkReducer = (state='',action) => {
    if(action.type=='fileShareLink') {
        return action.payload
    }
    else {
        return state
    }
}

export default fileSharingLinkReducer;