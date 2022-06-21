import { FileUtils } from './../utils/file_utils';
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
      newCategory.icon = process.env.DEFAULT_ICON;
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new BadRequestException(
        `The Category: "${createCategoryDto.name}" already exists`,
      );
    }
  }

  async assignIcon(id: number, file: MulterFile) {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (category) {
      const file_data = await FileUtils.uploadFile(file);
      category.icon = file_data.secure_url;
    }
    return category;
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
