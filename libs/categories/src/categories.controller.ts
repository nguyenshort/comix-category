import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CategoriesService } from './categories.service'
import { CreateCategoryInput } from './dto/create-category.input'

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('createJjj')
  create(@Payload() createJjjDto: CreateCategoryInput) {
    return this.categoriesService.create(createJjjDto)
  }
}
