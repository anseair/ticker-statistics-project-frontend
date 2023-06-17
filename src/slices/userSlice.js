import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        message: ''
    },
    reducers: {
        putUser: (state, action) => action.payload,
        deleteUser: (state) => {},
        errorUser: (state, action) => {
            state.message = action.payload
        }
    }
})

export const {putUser, deleteUser, errorUser} = userSlice.actions;
export default userSlice.reducer;

