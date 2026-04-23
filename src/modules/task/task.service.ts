import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,

    @InjectRepository(User)
    private usersRepo: Repository<User>, // bcuz every task belongs to a user
  ) {}

  async create(taskData: Partial<Task>, userId: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.tasksRepo.create({
      ...taskData,
      user,
    });
    return this.tasksRepo.save(task); // find user -> create task -> attach user -> save Db
  }

  findAll() {
    return this.tasksRepo.find({
      relations: ['user'],
    });
  }
  findOne(id: number) {
    return this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async update(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }
  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
