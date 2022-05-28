import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { Category } from '@app/categories/entities'
import { CreateCategoryInput } from '@app/categories/dto'
import { UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from '@comico/auth'
import { InputValidator, NotFoundError } from '@comico/core'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoriesService.findAll({})
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async upsertCategories(
    @Args('input', new InputValidator()) input: CreateCategoryInput
  ) {
    return this.categoriesService.upsert(input.name, input.content)
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async updateCategory(
    @Args('input', new InputValidator()) input: CreateCategoryInput,
    @Args('category', { type: () => String }) category: string
  ) {
    const _category = await this.categoriesService.findOne({ slug: category })
    if (!_category) {
      throw new NotFoundError('Category not found')
    }
    return this.categoriesService.update(_category, input)
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async removeCategory(
    @Args('category', { type: () => String }) category: string
  ) {
    const _category = await this.categoriesService.findOne({ slug: category })
    if (!_category) {
      throw new NotFoundError('category not found')
    }
    return this.categoriesService.destroy(_category)
  }
}
