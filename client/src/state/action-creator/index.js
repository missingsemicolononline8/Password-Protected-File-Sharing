export const setFileShareComponent = (component) => {
    return (dispatch) => {
        dispatch({
            type: 'activeFileShareComponent',
            payload: component
        })
    }
}

export const setFileSharingLink = (fileLink) => {
    return (dispatch) => {
        dispatch({
            type: 'fileShareLink',
            payload: fileLink
        })
    }
}