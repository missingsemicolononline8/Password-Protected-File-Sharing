import activeFileShareComponentReducer from "./activeFileShareComponentReducer";
import fileSharingLinkReducer from "./fileSharingLinkReducer";

import { combineReducers } from "redux";

const reducers = combineReducers({
    fileShareComponent: activeFileShareComponentReducer,
    fileSharingLink: fileSharingLinkReducer
})

export default reducers;