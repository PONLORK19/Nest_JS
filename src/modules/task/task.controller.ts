import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }
  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  createTask(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { userId, ...taskData } = body;

    if (!userId) {
      throw new Error('userId is required');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.taskService.create(taskData, userId);
  }

  @Patch(':id/done')
  markTaskAsDone(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.update(id, {
      completedAt: new Date(),
    });
  }

  @Patch(':id/pending')
  markTaskAsPending(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.update(id, {
      completedAt: undefined,
    });
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
