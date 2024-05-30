import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ENVIROMENT } from './config/enviroments'
import { BaseModule } from './modules/base.module'

@Module({
  imports: [MongooseModule.forRoot(ENVIROMENT.MONGODB_URI), BaseModule],
})
export class AppModule {}
