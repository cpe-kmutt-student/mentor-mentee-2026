import { HttpException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class SyContactService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(SyContactService.name);

	async getContactAll() {
		try {
			const getContact = await this.prisma.client.secondYearUser.findMany({
				include: {
					sycontact: true,
				},
			});

			return getContact;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
