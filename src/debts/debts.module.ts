import { Action } from './../actions/entities/action.entity';
import { ActionsService } from './../actions/actions.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/entities/category.entity';
import { Debt } from './entities/debt.entity';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Action, Debt, User])],
  controllers: [DebtsController],
  providers: [DebtsService, ActionsService, CategoriesService],
})
export class DebtsModule {}
