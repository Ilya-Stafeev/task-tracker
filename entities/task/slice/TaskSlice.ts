import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, TaskPriority, TaskStatus } from "../model/types";

export const addTaskAsync = createAsyncThunk(
    'tasks/addTaskAsync',
    async (newTask: {title: string, priority: TaskPriority}) => {
        const taskToSend = {
            ...newTask,
            status: TaskStatus.NEW
        }

        const response = await fetch('http://localhost:4300/api/tasks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskToSend)
        });

        if(!response.ok) {
            throw new Error('Ошибка при довлении задачи')
        }

        return await response.json()
        
    }
)

export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchTasksAsync',
    async () => {
      const response = await fetch('http://localhost:4300/api/tasks');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке задач');
      }
      return await response.json();
    }
);

export const fetchTaskByIdAsync = createAsyncThunk(
    'tasks/fetchTaskByIdAsync',
    async (taskId: string) => {
      const response = await fetch(`http://localhost:4300/api/tasks/${taskId}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке задачи');
      }
      return await response.json();
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTaskAsync',
    async (taskId: string) => {
      const response = await fetch(`http://localhost:4300/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении задачи');
      }
      return taskId;
    }
);

export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTaskAsync',
    async (task: { id: string; title: string; status: TaskStatus, priority: TaskPriority }) => {
      const response = await fetch(`http://localhost:4300/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении задачи');
      }
  
      return await response.json();
    }
  );
  
  
  

interface TaskState {
    tasks: ITask[];
    loading: boolean;
    error: string | null;
}

const initialState:TaskState = {
    tasks: [],
    loading: false,
    error: null
}

const TaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Получение всех задач
        builder.addCase(fetchTasksAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
        builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.loading = false;
        });
        builder.addCase(fetchTasksAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Произошла ошибка при загрузке задач';
        });
    
        // Получение одной задачи
        builder.addCase(fetchTaskByIdAsync.fulfilled, (state, action) => {
          const task = action.payload;
          // Опционально: добавить или обновить задачу в массиве
          const existingTask = state.tasks.find(t => t.id === task.id);
          if (existingTask) {
            existingTask.title = task.title;
            existingTask.status = task.status;
          } else {
            state.tasks.push(task);
          }
        });
    
        // Удаление задачи
        builder.addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
        });
    
        // Обновление задачи
        builder.addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
          const updatedTask = action.payload;
          const existingTask = state.tasks.find(t => t.id === updatedTask.id);
          if (existingTask) {
            existingTask.title = updatedTask.title;
            existingTask.status = updatedTask.status;
            existingTask.priority = updatedTask.priority;
          }
        });
    
        // Добавление задачи
        builder.addCase(addTaskAsync.fulfilled, (state, action) => {
          state.tasks.push(action.payload);
          state.loading = false;
        });
    
        builder.addCase(addTaskAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
    
        builder.addCase(addTaskAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Произошла ошибка при добавлении задачи';
        });
      },
})

export default TaskSlice.reducer