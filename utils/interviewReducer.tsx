import { createSlice } from '@reduxjs/toolkit'

export const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        id: '',
        type: '',
        agency: '',
        date: '',
        PID: '',
        client_name: ''
    },
    reducers: {
        setInterview: (state, action) => {
            state.id = action.payload.id,
                state.type = action.payload.type,
                state.agency = action.payload.agency,
                state.date = action.payload.date,
                state.PID = action.payload.PID,
                state.client_name = action.payload.client_name
        },
        eraseInterview: (state, action) => {
            state.id = '',
                state.type = '',
                state.agency = '',
                state.date = '',
                state.PID = '',
                state.client_name = ''
        }
    }
});

export const { setInterview, eraseInterview } = interviewSlice.actions;
export default interviewSlice.reducer;