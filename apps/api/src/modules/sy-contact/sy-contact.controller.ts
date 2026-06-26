import { Controller, Get, UseGuards } from "@nestjs/common";
import { SyContactService } from "./sy-contact.service";
import { LaunchPeriodGuard } from "src/common/guards/launch-period.guard";

@Controller("/_/sy/contact")
export class SyContactController {
	constructor(private readonly syContactService: SyContactService) {}

	@Get("/")
	@UseGuards(LaunchPeriodGuard)
	getContact() {
		return this.syContactService.getContactAll();
	}
}
