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

  public async find(dto: Input): Promise<any> {
    return await this.model.find(dto)
  }
  public async create(dto: Input): Promise<boolean> {
    throw new Error('not implemented')
  }
  public async remove(dto: Input): Promise<boolean> {
    throw new Error('not implemented')
  }
}
