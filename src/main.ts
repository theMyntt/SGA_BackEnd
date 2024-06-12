import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ENVIROMENT } from './config/enviroments'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const config = new DocumentBuilder()
    .setTitle('SGA API')
    .setDescription('SGA API Swagger Documentation')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(ENVIROMENT.PORT)
}
bootstrap()
