import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        message: ''
    },
    reducers: {
        putUser: (state, action) => action.payload,
        deleteUser: (state) => {},
        putMessage: (state, action) => {
            state.message = action.payload
        },
        closeMessage: (state, action) => {
            state.message = ''
        }
    }
})

export const {putUser, deleteUser, putMessage, closeMessage} = userSlice.actions;
export default userSlice.reducer;

