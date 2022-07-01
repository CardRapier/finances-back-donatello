import { Action } from './entities/action.entity';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/entities/category.entity';
import { Debt } from './../debts/entities/debt.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Action, Category, Debt])],
  controllers: [ActionsController],
  providers: [ActionsService, CategoriesService],
})
export class ActionsModule {}
