import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./core/prisma/prisma.module";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@repo/auth/server";
import { UtilsModule } from "./modules/utils/utils.module";

@Module({
	imports: [PrismaModule, BetterAuthModule.forRoot({ auth }), UtilsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
