import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    selectedUser: null,
    searchUserList: [],
};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setSearchUserList: (state, action) => {
            state.searchUserList = action.payload
        }
    }
})

export const { setSelectedUser, setSearchUserList } = chatSlice.actions

export default chatSlice.reducer;