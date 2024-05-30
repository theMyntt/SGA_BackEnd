import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ENVIROMENT } from './config/enviroments'

@Module({
  imports: [MongooseModule.forRoot(ENVIROMENT.MONGODB_URI), UserModule],
})
export class AppModule {}
