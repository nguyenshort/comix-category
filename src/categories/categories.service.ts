import { Injectable } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(input: CreateCategoryInput) {
    return this.categoryModel.create(input)
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

  async findMany(filter: object) {
    return this.categoryModel.find(filter)
  }

  async findAll() {
    return this.categoryModel.find()
  }

  async findOne(filter: object) {
    return this.categoryModel.findOne(filter)
  }

  async update(category: CategoryDocument, doc: CreateCategoryInput) {
    return this.categoryModel.findByIdAndUpdate(
      category._id,
      { ...doc },
      { returnOriginal: false }
    )
  }

  async remove(category: CategoryDocument) {
    return this.categoryModel.findByIdAndDelete(category._id)
  }
}
