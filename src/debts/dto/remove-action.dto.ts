import { AddActionDto } from './add-action.dto';
import { PartialType } from '@nestjs/swagger';

export class RemoveActionDto extends PartialType(AddActionDto) {}
