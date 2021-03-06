import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from '@app/categories/entities'
import { CoreService } from '@comico/core'

@Injectable()
export class CategoriesService extends CoreService<Category> {
  constructor(
    @InjectModel(Category.name) readonly categoryModel: Model<CategoryDocument>
  ) {
    super(categoryModel)
  }

  async upsert(name: string, content = '') {
    const category = await this.categoryModel.findOne({
      name: name.toLowerCase()
    })
    if (category) {
      return category
    }
    return this.create({ name, content })
  }
}
