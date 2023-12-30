const activeFileShareComponentReducer = (state='form',action) => {
    if(action.type=="activeFileShareComponent") {
        return action.payload;
    }
    else {
        return state;
    }
}

export default activeFileShareComponentReducer;