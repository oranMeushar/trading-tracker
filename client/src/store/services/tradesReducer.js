import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment-timezone'

const initialState = {
  tradesList: [],
  symbols: [],
  cards:[],
  stats:{},
  initialNet:null,
}

const dashboardSlice = createSlice({
  name: 'dashboard', 
  initialState,
  reducers: {
    setTrades: (state, action) => {
      state.tradesList = action.payload;
    },
    setSymbols: (state, action) => {
      state.symbols = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setStats: (state, action) => {  
      state.stats = action.payload;
    },
    setInitialNet: (state, action) => {
      state.initialNet = action.payload;
    }

  },
})


export const { 
    setTrades,
    setSymbols,
    setCards,
    setStats,
    setInitialNet
} = dashboardSlice.actions

export default dashboardSlice.reducer