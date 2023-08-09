import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productDetailsReducer,
  productsReducer
} from "./reducers/productReducer";



const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
