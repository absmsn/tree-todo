import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import { createAttachmentDir } from './utils/file';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  createAttachmentDir();
  await app.listen(PORT);
}
bootstrap();
