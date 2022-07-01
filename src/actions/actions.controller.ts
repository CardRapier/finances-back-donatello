import { PayloadToken } from './../auth/interfaces/token';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Auth } from 'src/auth/auth.decorator';

ApiBearerAuth();
@Controller('actions')
@ApiBearerAuth()
@ApiTags('actions')
@UseGuards(JwtAuthGuard)
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  async create(
    @Body() createActionDto: CreateActionDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.actionsService.create(createActionDto, payload.userId);
  }

  @Get()
  async findAll(@Auth() payload: PayloadToken) {
    return this.actionsService.findAll(payload.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Auth() payload: PayloadToken) {
    return this.actionsService.findOne(payload.userId, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActionDto: UpdateActionDto,
    @Auth() payload: PayloadToken,
  ) {
    return this.actionsService.update(payload.userId, +id, updateActionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Auth() payload: PayloadToken) {
    return this.actionsService.remove(payload.userId, +id);
  }
}
