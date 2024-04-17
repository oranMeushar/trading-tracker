import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment-timezone'

const initialState = {
  selectedDate:{
    startDate: moment().subtract(1, 'months').startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    endDate: moment().format('YYYY-MM-DDTHH:mm:ss')
  },
  selectedSymbols: [],
//   selectedPosition:{id:1, name:'All'},
  selectedPosition:'All',
//   selectedStatus:{id:1, name:'All'},
  selectedStatus:'All',
  selectedTimeFrameView: 'Daily',
}

const filtersSlice = createSlice({
  name: 'filters', 
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedSymbols: (state, action) => {
      state.selectedSymbols = action.payload;
    },
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedTimeFrameView: (state, action) => {
      state.selectedTimeFrameView = action.payload;
    },
  },
})


export const { 
    setSelectedDate,
    setSelectedSymbols,
    setSelectedPosition,
    setSelectedStatus,
    setSelectedTimeFrameView,
} = filtersSlice.actions

export default filtersSlice.reducer