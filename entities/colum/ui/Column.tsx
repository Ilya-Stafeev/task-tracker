import { FC } from 'react'
import { IColumn } from '../model/types'

import styles from './Column.module.scss'
import Task from '../../task/ui/Task'
import Button from '../../../shared/ui/btn/Button'

const Column: FC<{column:IColumn}> = ({ column }) => {
  return (
    <div className={styles.column}>
        <h1 className={styles.title}>{column.title}</h1>
        <div className={styles.tasks}>
            {column.tasks.map(task => (
                <Task task={task} key={task.id} />
            ))}
        </div>
        <div>{column.status === 'new' ? <Button/> : <></>}</div>
    </div>
  )
}

export default Column