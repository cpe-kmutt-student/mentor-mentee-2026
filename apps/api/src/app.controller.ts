import { Controller, Get, Session } from "@nestjs/common";
import { AppService } from "./app.service";
import { type UserSession } from "@thallesp/nestjs-better-auth";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Session() session: UserSession) {
		return this.appService.getHello(session);
	}
}
