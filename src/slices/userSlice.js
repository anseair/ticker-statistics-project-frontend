import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        putUser: (state, action) => action.payload,
        deleteUser: (state) => {},
    }
})

export const {putUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;

