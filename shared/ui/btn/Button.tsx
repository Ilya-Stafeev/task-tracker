import { FC } from 'react'
import styles from './Button.module.scss'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../entities/task/modals/slice/TaskModalSlice'

const Button: FC = () => {
  const dispatch = useDispatch()

  return <button className={styles.btn} onClick={() => dispatch(openModal())}>+ Добавить задачу</button>  
}

export default Button