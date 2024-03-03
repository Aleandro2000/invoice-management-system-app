import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function () {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(8081);
  } catch (e) {
    console.log(e);
  }
})();
