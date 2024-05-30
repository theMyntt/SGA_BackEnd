import { Test, TestingModule } from '@nestjs/testing'
import { RegisterController } from '@modules/user/controllers/register.controller'
import { RegisterUseCase } from '@modules/user/usecases/register.usecase'
import { UserService } from '@modules/user/services/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@modules/user/schemas/user.schema'
import { ENVIROMENT } from '@config/enviroments'

describe('RegisterController', () => {
  let controller: RegisterController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(ENVIROMENT.MONGODB_URI),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [RegisterController],
      providers: [
        { provide: 'U_REGISTER_USECASE', useClass: RegisterUseCase },
        { provide: 'S_USER_SERVICE', useClass: UserService },
      ],
    }).compile()

    controller = module.get<RegisterController>(RegisterController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
