import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InputValidator } from '@shared/validator/input.validator'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from '@comico/auth'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

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

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async categoryUpdate(
    @Args('input', new InputValidator()) input: CreateCategoryInput,
    @Args('category', { type: () => String }) category: string
  ) {
    const _category = await this.categoriesService.findOne({ slug: category })
    if (!_category) {
      //Todo: throw 404
    }
    return this.categoriesService.update(_category, input)
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async categoryRemove(
    @Args('category', { type: () => String }) category: string
  ) {
    const _category = await this.categoriesService.findOne({ slug: category })
    if (!_category) {
      //Todo: throw 404
    }
    return this.categoriesService.remove(_category)
  }
}
