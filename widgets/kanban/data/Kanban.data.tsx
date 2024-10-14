import { IColumn } from "../../../entities/colum/model/types";
import { TaskStatus } from "../../../entities/task/model/types";

export const KanbanData: IColumn[] = [
    {
        id: '1',
        title: 'Хотим сделать',
        status: TaskStatus.NEW,
        tasks: []     
    },
    {
        id: '2',
        title: 'Делаем',
        status: TaskStatus.IN_PROGRESS,
        tasks: []
    },
    {
        id: '3',
        title: 'Отложили',
        status: TaskStatus.POSTPONED,
        tasks: []
    },
    {
        id: '4',
        title: 'Сделали',
        status: TaskStatus.DONE,
        tasks: []
    }
]    
