import { Injectable } from "@nestjs/common";
import { PrismaService } from "./core/prisma/prisma.service";
import { UserSession } from "@thallesp/nestjs-better-auth";
import { UtilsService } from "./modules/utils/utils.service";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getHello(user: UserSession) {
		console.dir(user);
		const result = await this.prisma.client.user.findUnique({
			where: {
				id: user.user.id,
			},
			include: {
				fyuser: {
					include: {
						fyuser: true,
					},
				},
			},
		});
		return result;
	}
}
