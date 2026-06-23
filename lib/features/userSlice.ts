import { createSlice, PayloadAction } from '@reduxjs/toolkit' 
import { RootState } from '../store'
 

// Define a type for the slice state
export interface UserState {
  image: string
  isSubscription_active: boolean
  unreadCount: number
}

// Define the initial state using that type
const initialState: UserState = {
  image: "" ,
  isSubscription_active: false ,
  unreadCount: 0
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    },
    setIssubscription_active: (state, action: PayloadAction<boolean>) => {
      state.isSubscription_active = action.payload
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload
    }
  }
})

export const { setUserImage, setIssubscription_active, setUnreadCount } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserImage = (state: RootState) => state.user.image

export const selectIsSubscriptionActive = (state: RootState) => state.user.isSubscription_active

export const selectUnreadCount = (state: RootState) => state.user.unreadCount

export default userSlice.reducer