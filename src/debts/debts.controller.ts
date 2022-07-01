import { RemoveActionDto } from './dto/remove-action.dto';
import { AddActionDto } from './dto/add-action.dto';
import { PayloadToken } from './../auth/interfaces/token';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { Auth } from 'src/auth/auth.decorator';

ApiBearerAuth();
@ApiTags('debts')
@Controller('debts')
@UseGuards(JwtAuthGuard)
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  async create(
    @Body() createDebtDto: CreateDebtDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.debtsService.create(payload.userId, createDebtDto);
  }

  @Post('addAction')
  async addAction(
    @Body() addActionDto: AddActionDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.debtsService.addAction(payload.userId, addActionDto);
  }

  @Get()
  async findAll(@Auth() payload: PayloadToken) {
    return this.debtsService.findAll(payload.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Auth() payload: PayloadToken) {
    return this.debtsService.findOne(payload.userId, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.debtsService.update(payload.userId, +id, updateDebtDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Auth() payload: PayloadToken) {
    return this.debtsService.remove(payload.userId, +id);
  }

  @Delete('removeAction')
  async removeAction(
    @Body() removeActionDto: RemoveActionDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.debtsService.removeAction(payload.userId, removeActionDto);
  }
}
