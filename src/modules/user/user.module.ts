import { Module } from '@nestjs/common'
import { RegisterController } from './controllers/register.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { UserService } from './services/user.service'
import { RegisterUseCase } from './usecases/register.usecase'
import { LoginController } from './controllers/login.controller'
import { LoginUseCase } from './usecases/login.usecase'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [
    { provide: 'S_USER_SERVICE', useClass: UserService },
    { provide: 'U_REGISTER_USECASE', useClass: RegisterUseCase },
    { provide: 'U_LOGIN_USECASE', useClass: LoginUseCase },
  ],
})
export class UserModule {}
