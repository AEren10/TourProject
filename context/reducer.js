import { combineReducers } from "@reduxjs/toolkit";

import favoriteSlice from "./SliceFavorites";
// import  CounterSlice from './SliceCounter'

const rootReducer = combineReducers({
  favorites: favoriteSlice,
  // Counter : CounterSlice,
});

export default rootReducer;
