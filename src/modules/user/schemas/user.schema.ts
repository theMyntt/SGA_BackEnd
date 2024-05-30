import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { TGenderContract } from '../contracts/gender.contract'
import { IAddressContract } from '../contracts/address.contract'
import { IRgContract } from '../contracts/rg.contract'

export type TUserModel = {
  _id: string
  schoolId: string
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  rg: IRgContract
  address: IAddressContract
  birthDate: Date
  gender: TGenderContract
  class: string
  createdAt: Date
  updatedAt: Date
}

@Schema()
export class User implements TUserModel {
  @Prop({ type: String, required: true })
  public _id!: string

  @Prop({ type: String, required: true })
  public schoolId!: string

  @Prop({ type: String, required: true })
  public name!: string

  @Prop({ type: String, required: true })
  public email!: string

  @Prop({ type: String, required: true })
  public password!: string

  @Prop({ type: String, required: true })
  public phone!: string

  @Prop({ type: String, required: true })
  public cpf!: string

  @Prop({ type: Object, required: true })
  public rg!: IRgContract

  @Prop({ type: Object, required: true })
  public address!: IAddressContract

  @Prop({ type: Date, required: true })
  public birthDate!: Date

  @Prop({ type: String, required: true })
  public gender!: TGenderContract

  @Prop({ type: String, required: true })
  public class!: string

  @Prop({ type: Date, required: true })
  public createdAt!: Date

  @Prop({ type: Date, required: true, default: Date.now })
  public updatedAt!: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
