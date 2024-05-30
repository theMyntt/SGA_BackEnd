import { Module } from '@nestjs/common'
import { RegisterController } from './controllers/register.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegisterController],
})
export class UserModule {}
