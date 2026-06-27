import { render } from "@react-email/render";
import { sender } from "./sender";
import HintNotificationEmail from "./templates/HintNotificationEmail";

export async function sendHintNotification(name: string, hint: string) {
	try {
		const html = await render(
			HintNotificationEmail({
				menteeName: name,
				hint: hint,
				url: "https://comcamp.io",
			}),
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
