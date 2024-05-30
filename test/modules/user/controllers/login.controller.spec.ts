import { ENVIROMENT } from '@config/enviroments'
import { LoginController } from '@modules/user/controllers/login.controller'
import { User, UserSchema } from '@modules/user/schemas/user.schema'
import { UserService } from '@modules/user/services/user.service'
import { LoginUseCase } from '@modules/user/usecases/login.usecase'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

describe('LoginController', () => {
  let controller: LoginController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(ENVIROMENT.MONGODB_URI),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [LoginController],
      providers: [
        { provide: 'U_LOGIN_USECASE', useClass: LoginUseCase },
        { provide: 'S_USER_SERVICE', useClass: UserService },
      ],
    }).compile()

    controller = module.get<LoginController>(LoginController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
