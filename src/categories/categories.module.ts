import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategoryEntity } from './entities/category.entity'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { CategoriesController } from './categories.controller'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategoryEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
