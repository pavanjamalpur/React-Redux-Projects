import { legacy_createStore, compose, applyMiddleware } from "redux";
import { CommonReducers } from "../common-reducer/CommonReduer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//async operations for thunk 

const middlewareEnhancer = applyMiddleware(thunk);

//to check the global state functionality
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export const store = legacy_createStore (CommonReducers, composedEnhancers);