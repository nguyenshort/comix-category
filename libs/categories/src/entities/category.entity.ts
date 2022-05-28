import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { CoreModel } from '@comico/core'

export type CategoryDocument = Category & Document

@ObjectType()
@Schema()
export class Category extends CoreModel {
  @Field({ description: 'Tên thể loại' })
  @Prop({ required: true, lowercase: true, trim: true })
  name: string

  @Field()
  @Prop({ slug: 'name', unique: true })
  slug: string

  @Field()
  @Prop({ default: '' })
  content: string
}

export const CategoryEntity = SchemaFactory.createForClass(Category)
