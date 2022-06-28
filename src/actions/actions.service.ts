import { ACTION_NOT_FOUND, NOT_USER_ACTION } from './actions.exceptions';
import { CategoriesService } from './../categories/categories.service';
import { User } from './../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Action } from './entities/action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateActionDto } from './dto/update-action.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createActionDto: CreateActionDto, userId: number) {
    const newAction = this.actionRepository.create(createActionDto);
    const category = await this.categoryService.findOne(
      createActionDto.categoryId,
    );
    newAction.category = category;
    const user = await this.userRepository.findOneBy({ id: userId });
    newAction.user = user;
    return this.actionRepository.save(newAction);
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return this.actionRepository.find({
      where: { user: user },
      relations: ['category'],
    });
  }

  async findOne(userId: number, id: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return this.validateActionIsFromUser({ id }, user.id);
  }

  async update(userId: number, id: number, updateActionDto: UpdateActionDto) {
    const action = await this.validateActionIsFromUser({ id }, userId);
    if (action.category.id != updateActionDto.categoryId)
      action.category = await this.categoryService.findOne(
        updateActionDto.categoryId,
      );
    else delete updateActionDto.categoryId;
    return this.actionRepository.update(id, updateActionDto);
  }

  async remove(userId: number, id: number) {
    await this.validateActionIsFromUser({ id }, userId);
    return this.actionRepository.delete(id);
  }

  async validateActionIsFromUser(options: any, userId: number) {
    const action = await this.actionRepository.findOne({
      where: { ...options },
      relations: ['user', 'category'],
    });
    if (!action)
      throw new HttpException(ACTION_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (userId !== action.user.id)
      throw new HttpException(NOT_USER_ACTION, HttpStatus.CONFLICT);
    delete action.user;
    return action;
  }
}
