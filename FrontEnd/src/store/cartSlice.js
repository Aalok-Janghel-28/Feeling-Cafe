import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload
    },
    clearCartItems(state) {
      state.items = []
    },
  },
})

export const { setCartItems, clearCartItems } = cartSlice.actions
export default cartSlice.reducer
