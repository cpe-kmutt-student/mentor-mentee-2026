import { Injectable } from "@nestjs/common";
import { PrismaService } from "./core/prisma/prisma.service";
import { UserSession } from "@thallesp/nestjs-better-auth";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getHello(user: UserSession) {
		console.dir(user);
		const result = await this.prisma.client.user.findMany();
		return user;
	}
}
