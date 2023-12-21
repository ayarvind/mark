//store.js file
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { applyMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
const store = configureStore({
    reducer: reducers,
    
});

export default store;