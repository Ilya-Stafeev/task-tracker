import { FC } from 'react'
import { ITask, TaskPriority } from '../model/types'
import styles from './Task.module.scss'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { AppDispatch } from '../../../app/store/store'
import { useDispatch } from 'react-redux'
import { deleteTaskAsync } from '../slice/TaskSlice'
import { openModal } from '../modals/slice/TaskModalSlice'

const Task: FC<{task: ITask}> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const getBackgroundColor = () => {
    switch (task.priority) {
      case TaskPriority.HIGH:
        return 'rgba(255, 0, 0, 0.3)'; // Красный для высокого приоритета
      case TaskPriority.MEDIUM:
        return 'rgba(255, 255, 0, 0.3)'; // Желтый для среднего приоритета
      case TaskPriority.LOW:
      default:
        return 'transparent'; // Прозрачный для низкого приоритета
    }
  };

  return (
    <div className={styles.task} style={{ backgroundColor: getBackgroundColor() }}>
      <h2>{task.title}</h2>

      <div className={styles.buttons}>
        <button onClick={() => dispatch(openModal(task))}>
          <MdModeEdit />
        </button>
        <button onClick={ () => dispatch(deleteTaskAsync(task.id))}>
          <MdDelete />
        </button>
      </div>      
    </div>
  )
}

export default Task