import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./core/prisma/prisma.module";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@repo/auth/server";
import { UtilsModule } from "./modules/utils/utils.module";
import { DebugModule } from "./modules/debug/debug.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "node:path";
import { FyQuestModule } from "./modules/fy-quest/fy-quest.module";
import { FyAccountModule } from "./modules/fy-account/fy-account.module";

@Module({
	imports: [
		PrismaModule,
		BetterAuthModule.forRoot({ auth }),
		UtilsModule,
		DebugModule,
		ServeStaticModule.forRoot({
			rootPath: path.join(process.cwd(), "public"),
			exclude: ["/_/{*path}", "/docs/{*path}", "/{*path}"],
		}),
		FyQuestModule,
		FyAccountModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
