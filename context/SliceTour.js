import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tours: [],
};
const generateUniqueId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2, 15);

const SliceTour = createSlice({
  name: "tours",
  initialState,
  reducers: {
    addTours: (state, action) => {
      const tourData = {
        id: generateUniqueId(),
        value: action.payload,
      };
      state.tours.push(tourData);
    },
    removetours: (state, action) => {
      const removeTourIndex = state.tours.findIndex(
        (tour) => tour.id === action.payload.id
      );
      if (removeTourIndex !== -1) {
        state.tours.splice(removeTourIndex, 1);
      }
    },
  },
});

export const { addTours, removetours } = SliceTour.actions;

export default SliceTour.reducer;
