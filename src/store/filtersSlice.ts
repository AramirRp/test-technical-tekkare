import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  researchField: string;
  molecule: string;
  trialStatus: string;
}

const initialState: FiltersState = {
  researchField: 'all',
  molecule: 'all',
  trialStatus: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setResearchField: (state, action: PayloadAction<string>) => {
      state.researchField = action.payload;
    },
    setMolecule: (state, action: PayloadAction<string>) => {
      state.molecule = action.payload;
    },
    setTrialStatus: (state, action: PayloadAction<string>) => {
      state.trialStatus = action.payload;
    },
  },
});

export const { setResearchField, setMolecule, setTrialStatus } = filtersSlice.actions;
export default filtersSlice.reducer;