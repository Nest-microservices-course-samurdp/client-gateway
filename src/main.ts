import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/index';

async function bootstrap() {
  const logger = new Logger("Main-gateway");


  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", {
    exclude: [{
      path: "",
      method: RequestMethod.GET
    }],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )


  app.useGlobalFilters( new RpcCustomExceptionFilter())
  
  await app.listen(envs.PORT);

  console.log("Health check added");

  logger.log("Gateway runnin on port " + envs.PORT);
}
bootstrap();
