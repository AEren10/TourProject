import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorites: (state, action) => {
      const removeProduct = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (removeProduct !== -1) {
        // Eğer ürün bulunursa
        state.favorites.splice(removeProduct, 1);
      }
    },
  },
});

export const { addFavorites, removeFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
