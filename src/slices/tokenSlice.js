import {createSlice} from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        putToken: (state, action) => {
            return action.payload
        },
        deleteToken: (state) => {
            return ''
        }
    }
})

export const {putToken, deleteToken} = tokenSlice.actions;
export default tokenSlice.reducer;