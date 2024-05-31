import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IServiceContract } from '@shared/contracts/service.contract'
import { School } from '../schemas/school.schema'
import { Model } from 'mongoose'

@Injectable()
export class SchoolService<Input> implements IServiceContract<Input> {
  public constructor(
    @InjectModel(School.name)
    private readonly model: Model<School>,
  ) {}

  public async create(dto: Input): Promise<boolean> {
    try {
      const newSchool = new this.model(dto)
      await newSchool.save()

      return true
    } catch (error) {
      return false
    }
  }

  public async find(dto: Partial<School>): Promise<any> {
    return await this.model.find(dto)
  }

  public async findAll(): Promise<any> {
    return await this.model.find()
  }

  public async remove(dto: Partial<School>): Promise<boolean> {
    try {
      await this.model.deleteOne(dto)

      return true
    } catch (error) {
      return false
    }
  }
}
