import { render } from "@react-email/render";
import { sender } from "./sender";
import HintNotificationEmail from "./templates/HintNotificationEmail";

export async function sendAnnouncement() {
	try {
		const html = await render(
			HintNotificationEmail({ menteeName: "Hee", hint: "hee", url: "asd" }),
		);
		return await sender(
			"non.kanakorn@gmail.com",
			"ประกาศผลการคัดเลือก ComCamp 37",
			html,
		);
	} catch (e) {
		console.log("Send email error: ", e);
	}
}
