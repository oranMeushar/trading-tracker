import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment-timezone'

const initialState = {
  tradesLogs: {},
}

const logsSlice = createSlice({
  name: 'logs', 
  initialState,
  reducers: {
    setTradesLogs(state, action){
        state.tradesLogs = action.payload;
    },
  },
})


export const { 
    setTradesLogs,
} = logsSlice.actions

export default logsSlice.reducer