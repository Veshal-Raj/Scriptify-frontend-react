import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  _id?: string;
  personal_info: {
    username?: string;
    email?: string;
    bio?: string;
    profile_img?: string;
 };
 social_links: {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  website?: string;
};
role: string;
  followers: string[]; // Assuming followers are an array of strings (user IDs)
  following: string[]; // Assuming following is an array of strings (user IDs)
  // Add other properties as needed
 }

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData:  null as UserData | null,
    followers: [],
    following: [],
    isFollowing: false,
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
      if (state.userData && !state?.userData.following.includes(action.payload)) {
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
      if (state.userData) state.userData.following = state.userData.following.filter(id => id !== authorId);
    }
    
 
  },
});

export const { setUser, clearUser, addFollower, addFollowing , removeFollowing} = userSlice.actions;

export const selectUserData = (state: { user: { userData: unknown; }; }) => state.user.userData;

export default userSlice.reducer;
