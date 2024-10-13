import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "../task.entity";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}