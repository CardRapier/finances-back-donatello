import { CreateActionDto } from './create-action.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateActionDto extends PartialType(CreateActionDto) {}
