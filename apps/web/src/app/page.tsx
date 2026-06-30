"use client";

import Image from "next/image";
import { useState } from "react";
import AnnoyingStickers from "@/components/AnnoyingSticker";
import ParticlesBackground from "@/components/ParticlesBackground";
import { authClient } from "@/lib/auth-client";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		try {
			setIsLoading(true);
			await authClient.signIn.social({
				provider: "microsoft",
				callbackURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/what`,
			});
		} catch (error) {
			console.error("Login failed", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-light-cyan-200">
			<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden z-2">
				<button
					type="button"
					onClick={login}
					className={`h-16 bg-white rounded-lg border-3 border-black hover:bg-gray-100 active:bg-gray-300 transition duration-25 flex flex-row items-center justify-center gap-3 pr-8 pl-6 py-4 relative 
            ${isLoading ? "cursor-wait brightness-75" : "cursor-pointer"}
          `}
				>
					<Image
						src="/KMUTT.png"
						width={0}
						height={0}
						sizes="20vw"
						style={{ width: "auto", height: "50px" }}
						alt="KMUTT"
					/>
					<div className="text-base font-mali font-bold">
						ดำเนินการต่อด้วยบัญชี KMUTT
					</div>
				</button>
			</div>

			<footer className="absolute bottom-0 pl-3 pb-1 text-xs text-deep-twilight-800/25 z-100">
				©2026 CPE39. All rights reserved.
			</footer>
			<AnnoyingStickers />
			<ParticlesBackground />
		</div>
	);
}
