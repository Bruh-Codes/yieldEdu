import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import WagmiContextProvider from "@/components/WagmiContextProvider";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import YieldEDUIcon from "@/public/icon.png";
import GlobalContextProvider from "@/context/globalContext";

const spaceMono = Space_Grotesk({
	variable: "--font-space-mono",
	subsets: ["latin", "latin-ext", "vietnamese"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "YieldEDU - Earn Guaranteed Yields",
	description:
		"A decentralized fixed-yield protocol that earns users guaranteed yields on their EDU tokens.",
	icons: [YieldEDUIcon.src],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${spaceMono.variable} antialiased bg-slate-50 dark:bg-[#0A0B1E]`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<WagmiContextProvider cookies={cookies}>
						<GlobalContextProvider>{children}</GlobalContextProvider>
					</WagmiContextProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
