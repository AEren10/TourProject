import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tours: [],
};

const SliceTour = createSlice({
  name: "tours",
  initialState,
  reducers: {
    addTours: (state, action) => {
      // Yeni tur objesini oluştur
      const newTour = {
        id: Date.now(), // Yeni bir tur için ID oluştur
        stops: action.payload, // orderedStops array'ini yeni tur objesine ekle
      };
      // Yeni turu tours array'ine ekle
      state.tours.push(newTour);
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
