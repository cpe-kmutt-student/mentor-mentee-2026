import type { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@repo/config";
import {
	adapter,
	FirstYearUser,
	type PrismaClient,
	prisma,
	SecondYearUser,
} from "./client";
import hds_68 from "./seed/68_HDS.json";
import inter_68 from "./seed/68_Inter.json";
import regular_68 from "./seed/68_Regular.json";
import hds_69 from "./seed/69_HDS.json";
import inter_69 from "./seed/69_Inter.json";
import regular_69 from "./seed/69_Regular.json";

class PrismaSeed {
	private readonly adapter: PrismaPg;
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient, adapter: PrismaPg) {
		this.adapter = adapter;
		this.prisma = prisma;
	}

	async seedUser69() {
		try {
			// seeding Regular
			const insertRegularFy = await this.prisma.firstYearUser.createMany({
				data: regular_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 Regular, Total:", insertRegularFy.count);

			// seeding Inter
			const insertInterFy = await this.prisma.firstYearUser.createMany({
				data: inter_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 Inter, Total:", insertInterFy.count);

			// seeding HDS
			const insertHDSFy = await this.prisma.firstYearUser.createMany({
				data: hds_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 HDS, Total:", insertHDSFy.count);
		} catch (e) {
			console.log(e);
		}
	}

	async seedUser68() {
		try {
			// seeding Regular
			const insertRegularFy = await this.prisma.secondYearUser.createMany({
				data: regular_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 Regular, Total:", insertRegularFy.count);

			// seeding Inter
			const insertInterFy = await this.prisma.secondYearUser.createMany({
				data: inter_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 Inter, Total:", insertInterFy.count);

			// seeding HDS
			const insertHDSFy = await this.prisma.secondYearUser.createMany({
				data: hds_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
			});
			console.log("Created: 69 HDS, Total:", insertHDSFy.count);
		} catch (e) {
			console.log(e);
		}
	}
}

// Run seed
const prismaSeed = new PrismaSeed(prisma, adapter);
prismaSeed.seedUser69();
