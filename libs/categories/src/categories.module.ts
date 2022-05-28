import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategoryEntity } from '@app/categories/entities'
import { CategoriesController } from './categories.controller'

export const CATEGORY_CONNECT = MongooseModule.forFeatureAsync([
  {
    name: Category.name,
    useFactory: () => {
      const schema = CategoryEntity
      schema.plugin(require('mongoose-slug-generator'))
      return schema
    }
  }
])

@Module({
  imports: [CATEGORY_CONNECT],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
