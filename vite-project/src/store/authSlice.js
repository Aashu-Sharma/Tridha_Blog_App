import {createSlice} from '@reduxjs/toolkit';


const authSlice = createSlice({
    name : "auth",

    initialState : {
        status : false,
        userData : null
    },

    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logOut : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logOut} = authSlice.actions;

export default authSlice.reducer;
