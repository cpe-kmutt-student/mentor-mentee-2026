"use client";

import { useEffect } from "react";

export default function AnnoyingStickers() {
	useEffect(() => {
		const stickers = ["WRONG_WAY", "TRY_HARDER", "NOPE", "404_LIFE", "SYSTEM_TROLL", "CPE", "67", "24/7"];

		const interval = setInterval(() => {
			const sticker = document.createElement("div");

			sticker.className = "random-sticker bg-[#03045E] text-white border-4 border-[#00B4D8] shadow-[4px_4px_0px_0px_rgba(0,180,216,1)] z-[1]";

			sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];

			sticker.style.left = `${Math.random() * 80 + 5}%`;
			sticker.style.top = `${Math.random() * 80 + 5}%`;

			document.body.appendChild(sticker);

			setTimeout(() => sticker.remove(), 3000);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return null;
}
