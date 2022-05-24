import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloModule } from '@apollo/apollo.module'
import { DatabaseModule } from '@database/database.module'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from './categories/categories.module'
import { AuthModule } from '@comico/auth'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ApolloModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
