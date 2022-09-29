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
        },
        setUserID: (state, action) => {
            state.id = action.payload
        },
        setUserLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setUserAdmin: (state, action) => {
            state.admin = action.payload
        },
        setUserName: (state, action) => {
            state.name = action.payload
        },
        setUserEditor: (state, action) => {
            state.editor = action.payload
        },
    }
});

export const { loginUser, logoutUser, setUserID, setUserLoggedIn, setUserAdmin, setUserName, setUserEditor } = userSlice.actions;
export default userSlice.reducer;