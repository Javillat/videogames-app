import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducer/Reducer';
//import {composeWithDevTools} from 'redux-devtools-extension'
//composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
    Reducer,
    applyMiddleware(thunk)
);