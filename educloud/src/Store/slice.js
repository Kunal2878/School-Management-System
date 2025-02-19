import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: 0,
    id:'',
    name:'',
    email:'',
    mob:'',
    role:''

  },
  reducers: {
    setData: (state,action) => {
      // state.id = action.payload.id,
      state.name = action.payload.name,
      state.email= action.payload.email

    }
   
  },
})

export const {setData} = dataSlice.actions
export default dataSlice.reducer