import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    async create (task: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(task)
        return this.taskRepository.save(newTask)
    }

    async findAll (): Promise<Task[]> {
        return this.taskRepository.find()
    }

    async update (id: string, task: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update(id, task)
        return this.taskRepository.findOneBy({ id })
    }

    async remove (id: string): Promise<void> {
        await this.taskRepository.delete(id)
    }
}
