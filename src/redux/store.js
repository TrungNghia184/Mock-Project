import { configureStore } from '@reduxjs/toolkit'
import globalReducer from '../redux/slices/globalSlices'
export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
})