import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../model/types';


interface ModalState {
    isOpen: boolean;
    taskToEdit?: ITask;
}

const initialState: ModalState = {
    isOpen: false,
    taskToEdit: undefined,
};

const taskModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<ITask | undefined>) {
            state.isOpen = true;
            state.taskToEdit = action.payload;
        },
        closeModal(state) {
            state.isOpen = false;
            state.taskToEdit = undefined;
        },
    },
});

export const { openModal, closeModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
