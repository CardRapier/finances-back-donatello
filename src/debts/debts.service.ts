import { RemoveActionDto } from './dto/remove-action.dto';
import { AddActionDto } from './dto/add-action.dto';
import { Action } from './../actions/entities/action.entity';
import { ActionsService } from './../actions/actions.service';
import { DEBT_NOT_FOUND, NOT_USER_DEBT } from './debts.exceptions';
import { Debt } from './entities/debt.entity';
import { User } from './../auth/entities/user.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { find } from 'rxjs';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly actionsService: ActionsService,
  ) {}
  async create(userId: number, createDebtDto: CreateDebtDto) {
    const newDebt = this.debtRepository.create(createDebtDto);
    const user = await this.userRepository.findOneBy({ id: userId });
    newDebt.user = user;
    newDebt.actions = [];
    return this.debtRepository.save(newDebt);
  }

  async addAction(userId: number, addActionDto: AddActionDto) {
    const { debtId, actionId } = addActionDto;
    const debt = await this.findOne(userId, debtId);
    const action = await this.actionsService.findOne(userId, actionId);
    debt.actions = [...debt.actions, action];
    return this.debtRepository.save(debt);
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return this.debtRepository.find({
      where: { user: user },
      relations: ['actions'],
    });
  }

  async findOne(userId: number, id: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return this.validateDebtIsFromUser({ id }, user.id);
  }

  async update(userId: number, id: number, updateDebtDto: UpdateDebtDto) {
    await this.validateDebtIsFromUser({ id }, userId);
    return this.debtRepository.update(id, updateDebtDto);
  }

  async remove(userId: number, id: number) {
    await this.validateDebtIsFromUser({ id }, userId);
    return this.debtRepository.delete(id);
  }

  async removeAction(userId: number, removeActionDto: RemoveActionDto) {
    const { debtId, actionId } = removeActionDto;
    const debt = await this.findOne(userId, debtId);
    debt.actions = debt.actions.filter((action) => action.id !== actionId);
    return this.debtRepository.save(debt);
  }

  async validateDebtIsFromUser(options: any, userId: number) {
    const debt = await this.debtRepository.findOne({
      where: { ...options },
      relations: ['user', 'actions'],
    });
    if (!debt) throw new HttpException(DEBT_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (userId !== debt.user.id)
      throw new HttpException(NOT_USER_DEBT, HttpStatus.CONFLICT);
    delete debt.user;
    return debt;
  }
}
