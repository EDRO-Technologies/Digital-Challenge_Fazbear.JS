import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ConfigService } from "@nestjs/config/dist";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get<ConfigService>(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('APP_NAME'))
    .setDescription("Description")
    .setVersion("1.0")
    .addTag("nice tag")
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("swagger", app, swaggerDocument);

  const PORT = config.get<number>('APP_PORT');
  const HOST_NAME = config.get<string>('APP_HOST_NAME');
  const HOST_URL = `http://${HOST_NAME}:${PORT}`;

  const PG_ADMIN_PORT = config.get<number>('PGADMIN_PORT');
  const PG_ADMIN_URL = `http://${HOST_NAME}:${PG_ADMIN_PORT}`;

  await app.listen(PORT);

  console.log(`App:       ${HOST_URL}`);
  console.log(`Swagger:   ${HOST_URL}/swagger`);
  console.log(`PgAdmin:   ${PG_ADMIN_URL}`);
}

bootstrap();
