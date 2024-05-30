import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ENVIROMENT } from './config/enviroments'
import { BaseModule } from './modules/base.module'

@Module({
  imports: [MongooseModule.forRoot(ENVIROMENT.MONGODB_URI), BaseModule],
})
export class AppModule {}
