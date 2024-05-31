import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { School, SchoolSchema } from './schemas/school.schema'
import { SchoolService } from './services/school.service'
import { RegisterController } from './controllers/register.controller'
import { RegisterUseCase } from './usecases/register.usecase'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
  ],
  controllers: [RegisterController],
  providers: [
    { provide: 'S_SCHOOL_SERVICE', useClass: SchoolService },
    { provide: 'U_REGISTER_USECASE', useClass: RegisterUseCase },
  ],
})
export class SchoolModule {}
