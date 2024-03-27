import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    followers: [],
    following: []
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
    addFollower: (state, action) => {
      
      state?.userData?.followers?.push(action.payload) 
    },
    addFollowing: (state, action) => {
      if (!state?.userData.following.includes(action.payload)) {
        // If not, push it into the following list
        state?.userData.following.push(action.payload);
        // Update isFollowing state
        state.isFollowing = true;
    } else {
        // If already present, set isFollowing to true
        state.isFollowing = true;
    } 
      
      // state.following = state.following.filter( (data) => data !== action.payload)
    },

    removeFollowing: (state, action) => {
      const authorId = action.payload;
      state.userData.following = state.userData.following.filter(id => id !== authorId);
    }
    
 
  },
});

export const { setUser, clearUser, addFollower, addFollowing , removeFollowing} = userSlice.actions;

export const selectUserData = (state: { user: { userData: unknown; }; }) => state.user.userData;

export default userSlice.reducer;
