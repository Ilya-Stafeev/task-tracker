export enum TaskStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    POSTPONED = 'postponed',
    DONE = 'done'
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export interface ITask {
    id: string
    title: string;
    description?: string
    status: TaskStatus
    priority: TaskPriority
}