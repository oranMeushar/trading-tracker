import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: {},
}

const usersSlice = createSlice({
  name: 'users', 
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      state.user = {}
      localStorage.removeItem('user');
      window.location.reload();
    }

  },
})


export const { 
  setLogin,
  setLogout,
} = usersSlice.actions

export default usersSlice.reducer