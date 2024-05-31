import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { IAddressContract } from '@shared/contracts/address.contract'

export type TSchoolModel = {
  _id: string
  name: string
  address: IAddressContract
  createdAt: Date
  updatedAt: Date
}

@Schema()
export class School implements TSchoolModel {
  @Prop({ type: String, required: true })
  public _id: string

  @Prop({ type: String, required: true })
  public name: string

  @Prop({ type: Object, required: true })
  public address: IAddressContract

  @Prop({ type: Date, required: true })
  public createdAt: Date

  @Prop({ type: Date, default: Date.now, required: true })
  public updatedAt: Date
}

export const SchoolSchema = SchemaFactory.createForClass(School)
