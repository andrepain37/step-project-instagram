import { applyMiddleware, compose, createStore } from "redux";
import reducer from './reducer';
import thunk from 'redux-thunk';

const devtools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), devtools)
);

export default store;