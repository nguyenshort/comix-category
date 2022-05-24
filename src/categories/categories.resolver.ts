import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InputValidator } from '@shared/validator/input.validator'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { ClientProxy } from '@nestjs/microservices'
import { Inject, UseGuards } from '@nestjs/common'
import { CurrentUser, JWTAuthGuard, OptionAuthGuard } from '@comico/auth'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) {}

  @Query(() => [Category])
  async categories() {
    return await this.categoriesService.findMany({})
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async categoryUpsert(
    @Args('input', new InputValidator()) input: CreateCategoryInput
  ) {
    return this.categoriesService.upsert(input.name, input.content)
  }

  @Mutation(() => [Category], { name: 'categories' })
  async getCategories() {
    return this.categoriesService.findMany({})
  }
}
