import { CategoriesService } from './../categories/categories.service';
import { User } from './../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Action } from './entities/action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { Injectable } from '@nestjs/common';
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

  async create(createActionDto: CreateActionDto, id: number) {
    const newAction = this.actionRepository.create(createActionDto);
    const category = await this.categoryService.findOne(
      createActionDto.categoryId,
    );
    newAction.category = category;
    const user = await this.userRepository.findOneBy({ id });
    newAction.user = user;
    return this.actionRepository.save(newAction);
  }

  async findAll() {
    return `This action returns all actions`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  async update(id: number, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  async remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
