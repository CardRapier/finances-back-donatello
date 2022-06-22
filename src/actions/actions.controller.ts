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
    return this.actionsService.create(createActionDto, payload.id);
  }

  @Get()
  async findAll() {
    return this.actionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.actionsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActionDto: UpdateActionDto,
  ) {
    return this.actionsService.update(+id, updateActionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.actionsService.remove(+id);
  }
}
