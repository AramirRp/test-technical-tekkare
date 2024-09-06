import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  medicationData: any;
  researchData: any;
}

const initialState: DataState = {
  medicationData: null,
  researchData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMedicationData: (state, action: PayloadAction<any>) => {
      state.medicationData = action.payload;
    },
    setResearchData: (state, action: PayloadAction<any>) => {
      state.researchData = action.payload;
    },
  },
});

export const { setMedicationData, setResearchData } = dataSlice.actions;
export default dataSlice.reducer;
