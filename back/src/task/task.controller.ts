import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask (@Body() creteTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(creteTaskDto)
    }

    @Get()
    async findAllTasks (): Promise<Task[]> {
        return this.taskService.findAll()
    }

    @Put(':id')
    async updateTask (@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto)
    }

    @Delete(':id')
    async removeTask(@Param('id') id: string): Promise<void> {
        return this.taskService.remove(id)
    }

}
