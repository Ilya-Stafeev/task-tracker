'use client'

import { FC, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './TaskModal.module.scss'
import ModalInput from './input/ModalInput'
import ModalButton from './btn/ModalButton'
import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from './slice/TaskModalSlice'
import { AppDispatch, RootState } from '../../../app/store/store'
import { addTaskAsync, updateTaskAsync } from '../slice/TaskSlice'
import { TaskPriority, TaskStatus } from '../model/types'


const TaskModal: FC = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const taskToEdit = useSelector((state: RootState) => state.modal.taskToEdit);
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const [inputValue, setInputValue] = useState<string>('');
    const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.NEW);
    const [taskPriority, setTaskPriority] = useState<TaskPriority>(TaskPriority.LOW);

    useEffect(() => {
        if (taskToEdit) {
            setInputValue(taskToEdit.title);
            setTaskStatus(taskToEdit.status);
            setTaskPriority(taskToEdit.priority)
        } else {
            setInputValue('');
            setTaskStatus(TaskStatus.NEW);
            setTaskPriority(TaskPriority.LOW)         
        }
    }, [taskToEdit]);

    const handleInputChange = (newValue: string) => {        
        setInputValue(newValue)       
    } 

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskStatus(event.target.value as TaskStatus);
    };

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(event.target.value as TaskPriority);
    };

    const handleSubmit = async () => {
        if (taskToEdit) {
            setInputValue(taskToEdit.title)       
            await dispatch(updateTaskAsync({ id: taskToEdit.id, title: inputValue, status: taskStatus, priority: taskPriority  }));
        } else {
            setInputValue('')
            await dispatch(addTaskAsync({ title: inputValue, priority: taskPriority  }));
        }
        dispatch(closeModal());
    };
    
  return (
    <>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, transition: { delay: 0.3 } }}
                    className={styles.background}
                    onClick={e => e.stopPropagation()}
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { duration: 0.3 } }}
                        exit={{ scale: 0, transition: { delay: 0.3 } }}
                        className={styles.modal}  
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h1>{taskToEdit ? 'Изменить' : 'Добавить'}</h1>
                            <ModalButton title='X' onClick={() => dispatch(closeModal())}/>
                        </div>

                        <ModalInput value={inputValue} onChange={handleInputChange}/>

                        {taskToEdit ? 
                            <>
                                <div className={styles.statusSelect}>
                                    <label htmlFor="task-status">Статус задачи:</label>
                                    <select id="task-status" value={taskStatus} onChange={handleStatusChange}>
                                        <option value={TaskStatus.NEW}>Новая</option>                                   
                                        <option value={TaskStatus.IN_PROGRESS}>В процессе</option>
                                        <option value={TaskStatus.POSTPONED}>Отложенная</option>
                                        <option value={TaskStatus.DONE}>Завершенная</option>
                                    </select>
                                </div>

                                <div className={styles.prioritySelect}>
                                    <label htmlFor="task-priority">Приоритет задачи:</label>
                                    <select id="task-priority" value={taskPriority} onChange={handlePriorityChange}>
                                        <option value={TaskPriority.LOW}>Низкий</option>
                                        <option value={TaskPriority.MEDIUM}>Средний</option>
                                        <option value={TaskPriority.HIGH}>Высокий</option>
                                    </select>
                                </div>
                            </>
                            :
                            <>
                                <div className={styles.prioritySelect}>
                                    <label htmlFor="task-priority">Приоритет задачи:</label>
                                    <select id="task-priority" value={taskPriority} onChange={handlePriorityChange}>
                                        <option value={TaskPriority.LOW}>Низкий</option>
                                        <option value={TaskPriority.MEDIUM}>Средний</option>
                                        <option value={TaskPriority.HIGH}>Высокий</option>
                                    </select>
                                </div>
                            </>
                        }

                        


                        <div className={styles.footer}>
                            <ModalButton title={taskToEdit ? 'Изменить' : 'Добавить'} onClick={handleSubmit}/>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  )
}

export default TaskModal