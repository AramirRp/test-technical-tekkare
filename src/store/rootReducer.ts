import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import filtersReducer from './filtersSlice';

const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
});

export default rootReducer;