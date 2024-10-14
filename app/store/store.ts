import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import modalReducer from '../../entities/task/modals/slice/TaskModalSlice'
import tasksReducer from '../../entities/task/slice/TaskSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        tasks: tasksReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()