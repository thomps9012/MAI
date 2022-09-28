import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        admin: false,
        loggedIn: false,
        editor: false,
        id: '',
        name: ''
    },
    // initialState: {
    //     loggedIn: true,
    //     admin: true,
    //     id: '1234567',
    //     name: 'Test Admin'
    // },
    reducers: {
        loginUser: (state, action) => {
            state.loggedIn = true,
                state.id = action.payload.id,
                state.name = action.payload.full_name,
                state.admin = action.payload.admin,
                state.editor = action.payload.editor
        },
        logoutUser: (state, action) => {
            state.id = '',
                state.name = '',
                state.admin = false,
                state.loggedIn = false,
                state.editor = false
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;