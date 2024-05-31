import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { SchoolModule } from './school/school.module';

@Module({
  imports: [UserModule, SchoolModule],
})
export class BaseModule {}
