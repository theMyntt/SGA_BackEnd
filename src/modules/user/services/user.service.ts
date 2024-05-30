import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IServiceContract } from 'src/shared/contracts/service.contract'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService<Input> implements IServiceContract<Input> {
  public constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  public async find(dto: Partial<User>): Promise<any> {
    return await this.model.find(dto)
  }
  public async create(dto: Input): Promise<boolean> {
    try {
      const newUser = new this.model(dto)
      await newUser.save()

      return true
    } catch (error) {
      return false
    }
  }

  public async remove(): Promise<boolean> {
    throw new Error('not implemented')
  }
}
