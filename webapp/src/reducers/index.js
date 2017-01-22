import { combineReducers } from 'redux';

import user from './user';
import cards from './cards';

const rootReducer = combineReducers({ user, cards });

export default rootReducer;
