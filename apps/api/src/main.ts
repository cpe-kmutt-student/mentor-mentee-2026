import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "@repo/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});
	await app.listen(config.backend.port);
}
bootstrap();
