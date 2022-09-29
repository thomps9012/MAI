import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./interviewReducer";
import userReducer from "./userReducer";

export default configureStore({
    reducer: {
        interview: interviewReducer,
        user: userReducer
    }
});