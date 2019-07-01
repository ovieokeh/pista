import { combineReducers } from 'redux';
import { authReducer as auth } from './authReducer';
import { budgetReducer as budget } from './budgetReducer';

const rootReducer = combineReducers({
  auth,
  budget
});

export default rootReducer;
