import {  createStore, combineReducers, applyMiddleware } from "redux";
 
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer,productDetailsReducer,productSearchReducer } from "./reducers/ProductReducer";

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
   product: productSearchReducer
});

let initialState={};

const middleware=[thunk];

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));


export default store;
