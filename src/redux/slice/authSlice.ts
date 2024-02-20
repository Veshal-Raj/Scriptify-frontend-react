import { createSlice } from "@reduxjs/toolkit";

type userDataType = { [key: string]: string | number };

// export interface IUserState {
//   isLoading: boolean;
//   userData: userDataType;
//   user?: any;
// }

const initialState = {
  isLoading: true,
  userData: {} as userDataType,
};
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.userData = action.payload.userData;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.userData = {}
        }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
