'use client'
import React, { FC, useEffect, useState } from 'react'
import { IColumn } from '../../entities/colum/model/types'
import Column from '../../entities/colum/ui/Column'

import styles from './Kanban.module.scss'
import { ITask } from '../../entities/task/model/types'
import { AppDispatch, RootState } from '../../app/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasksAsync } from '../../entities/task/slice/TaskSlice'


const Kanban: FC<{columns: IColumn[]}> = ({ columns }) => {
  const [Columns, setColumns] = useState<IColumn[]>(columns)  

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  useEffect(() => {    
    const updateColumns = columns.map((column: IColumn) => ({
      ...column,
      tasks: tasks.filter((task: ITask) => task.status === column.status),
    }));

    setColumns(updateColumns);
  }, [tasks, columns]);
 
  return (
    <div className={styles.kanban}>
      {Columns.map(colum => (
        <Column column={colum} key={colum.id}/>
      ))}      
    </div>
  )
}

export default Kanban