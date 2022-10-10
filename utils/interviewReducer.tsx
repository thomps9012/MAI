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
        setInterviewID: (state, action) => {
            state.id = action.payload
        },
        setInterviewType: (state, action) => {
            state.type = action.payload
        },
        setInterviewAgency: (state, action) => {
            state.agency = action.payload
        },
        setInterviewDate: (state, action) => {
            state.date = action.payload
        },
        setClientPID: (state, action) => {
            state.PID = action.payload
        },
        setClientName: (state, action) => {
            state.client_name = action.payload
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

export const { setInterviewID, setInterviewType, setInterviewAgency, setInterviewDate, setClientPID, setClientName, eraseInterview } = interviewSlice.actions;
export default interviewSlice.reducer;