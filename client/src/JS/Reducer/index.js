import {combineReducers} from "redux"
import contactReducer  from "./contact"
import userReducer from "./user"

const rootReducer = combineReducers({contactReducer , userReducer})

export default rootReducer