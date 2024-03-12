import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

(async function () {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(process.env.SERVER_PORT || 8081);
  } catch (e) {
    console.log(e);
  }
})();
