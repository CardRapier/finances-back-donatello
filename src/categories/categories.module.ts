import { Action } from './../actions/entities/action.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Action])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
