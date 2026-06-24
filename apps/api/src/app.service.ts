import { Injectable } from "@nestjs/common";
import { PrismaService } from "./core/prisma/prisma.service";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getHello() {
		const result = await this.prisma.client.user.findMany();
		return result;
	}
}
