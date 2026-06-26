import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { FyQuestService } from "./fy-quest.service";
import { QuestAllow, QuestPeriodGuard } from "src/common/guards/quest-period.guard";
import { Request } from "express";

@Controller("/_/fy/quest")
export class FyQuestController {
	constructor(private readonly fyQuestService: FyQuestService) {}

	@Get("/")
	@UseGuards(QuestPeriodGuard)
	getQuest(@Session() session: UserSession, @Req() req: Request & { questAllow: QuestAllow }) {
		return this.fyQuestService.getQuest(session.user.id, req);
	}

	@Get("/:id")
	@UseGuards(QuestPeriodGuard)
	getQuestById(@Session() session: UserSession, @Req() req: Request & { questAllow: QuestAllow }, @Param("id") questId: string) {
		return this.fyQuestService.getQuestById(session.user.id, req, questId);
	}
}
