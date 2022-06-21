import { MulterFile } from './../../node_modules/@webundsoehne/nest-fastify-file-upload/dist/interfaces/multer-options.interface.d';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new BadRequestException(
        `The Category: "${createCategoryDto.name}" already exists`,
      );
    }
  }

  async assignIcon(file: MulterFile) {
    return 'lmao';
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async validateNameUnique(name: string) {
    const category = await this.categoryRepository.findOne({
      where: [{ name: name }],
    });

    if (category)
      throw new BadRequestException(`The Category: "${name}" already exists`);
  }
}
