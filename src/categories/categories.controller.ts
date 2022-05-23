import { Controller, Inject } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices'
import { CategoriesService } from './categories.service'
import { CreateCategoryInput } from './dto/create-category.input'

@Controller()
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) {}

  @MessagePattern('createJjj')
  create(@Payload() createJjjDto: CreateCategoryInput) {
    return this.categoriesService.create(createJjjDto)
  }
}
