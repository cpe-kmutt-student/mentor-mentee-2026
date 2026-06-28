import type React from "react";

export default function PageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
	return (
		<>
			<div className="bg-white min-h-screen">{children}</div>
		</>
	);
}
