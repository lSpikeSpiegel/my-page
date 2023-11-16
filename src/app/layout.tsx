import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/Provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "欢迎访问我的主页"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
				<div className="fixed bottom-0 w-screen text-center">蜀ICP备2023030071号</div>
			</body>
		</html>
	);
}
