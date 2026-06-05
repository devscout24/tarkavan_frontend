import { createSlice, PayloadAction } from '@reduxjs/toolkit' 
import { RootState } from '../store'
 

// Define a type for the slice state
export interface UserState {
  image: string
}

// Define the initial state using that type
const initialState: UserState = {
  image: ""
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    }
  }
})

export const { setUserImage } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserImage = (state: RootState) => state.user.image

export default userSlice.reducer