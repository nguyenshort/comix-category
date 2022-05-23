import { Args, Context, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InputValidator } from '@shared/validator/input.validator'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { ClientProxy } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

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
  async categoryUpsert(
    @Args('input', new InputValidator()) input: CreateCategoryInput,
    @Info() info: any,
    @Context() context: any
  ) {
    this.client.send('auth', {}).subscribe(console.log)
    return this.categoriesService.upsert(input.name, input.content)
  }
}
