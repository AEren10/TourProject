import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actions: [],
};

const LastActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addActions: (state, action) => {
      // Eylemin listede olup olmadığını kontrol et
      const exists = state.actions.some(
        (item) => item.name === action.payload.name
      );
      // Eğer listede yoksa ekle
      if (!exists) {
        state.actions.push(action.payload);
      }
    },
    removeActions: (state, action) => {
      const removeProduct = state.actions.findIndex(
        (item) => item.name === action.payload.name
      );
      if (removeProduct !== -1) {
        // Eğer ürün bulunursa
        state.actions.splice(removeProduct, 1);
      }
    },
  },
});

export const { addActions, removeActions } = LastActionSlice.actions;

export default LastActionSlice.reducer;
