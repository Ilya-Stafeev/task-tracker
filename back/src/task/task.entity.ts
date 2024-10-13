import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;

    @Column({
        type: 'varchar',    
        default: TaskStatus.NEW
    })
    status: TaskStatus

    @Column({
        type: 'varchar',      
        default: TaskPriority.LOW
    })
    priority: TaskPriority

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}