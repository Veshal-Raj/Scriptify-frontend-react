import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userData = null
        }
    }
})


export const { setUser, clearUser } = userSlice.actions;

export const selectUserData = (state) => state.user.userData

export default userSlice.reducer