import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    // initialState: {
    //     admin: false,
    //     id: '',
    //     name: ''
    // },
    initialState: {
        admin: true,
        id: '1234567',
        name: 'Test Admin'
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id,
                state.admin = action.payload.admin,
                state.name = action.payload.name
        },
        logoutUser: (state, action) => {
            state.id = '',
                state.name = '',
                state.admin = false
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;