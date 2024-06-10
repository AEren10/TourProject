import { combineReducers } from "@reduxjs/toolkit";

import favoriteSlice from "./SliceFavorites";
import LastActionSlice from "./SliceLastAction";
import SliceTour from "./SliceTour";
// import  CounterSlice from './SliceCounter'

const rootReducer = combineReducers({
  favorites: favoriteSlice,
  actions: LastActionSlice,
  tours: SliceTour,
  // Counter : CounterSlice,
});

export default rootReducer;
