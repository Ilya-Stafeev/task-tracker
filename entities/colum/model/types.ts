import { ITask, TaskStatus } from "../../task/model/types"

export interface IColumn {
    id: string
    title: string
    status: TaskStatus
    tasks: ITask[]    
}