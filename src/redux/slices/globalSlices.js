import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  language: 'en',
  globalLoading: false,
}

export const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload
      console.log(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function

export const { incrementByAmount, setLanguage, setGlobalLoading } = globalSlice.actions
export default globalSlice.reducer