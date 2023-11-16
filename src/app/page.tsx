import { Button } from "@chakra-ui/react";
import { useTranslation } from "@/i18n";
const isClient = typeof window === "undefined";

export default async function Home() {
	const { t } = await useTranslation("cn", "translation");

	return (
		<div className="w-screen h-screen flex box-border p-20px">
			{t("title")}
			<div className="flex-1 flex flex-col gap-40px p-80px">
				<h1 className="text-60px font-bold">Hello.</h1>
				<h3 className="text-40px font-bold">My name is Evan You.</h3>
				<p className="text-24px">
					I am an independent software developer currently based in Singapore. I am the
					creator of the JavaScript framework Vue.js and the frontend build tool Vite.
					Most of my work is open source and publicly available on GitHub. If you happen
					to benefit from my OSS work, you can support me financially via GitHub Sponsors.
				</p>
				<p className="text-24px">
					You can follow me on Twitter where I mostly tweet about Vue and frontend
					technologies. If you happen to speak Chinese, my Chinese name is 尤雨溪 (yóu yǔ
					xī) and I have a Chinese-only Twitter alt for non-tech-focused musings. You can
					also find me on 微博 and 知乎.
				</p>
				<p className="text-24px">
					Outside of programming and helping my wife take care of our two kids, I enjoy
					video games, karaoke, sushi, watching UFC/F1, and collecting mechanical watches.
				</p>
			</div>
			<div className="flex-1 flex-shrink-0 flex justify-center items-center">
				<Button className="w-200px h-48px border-2px btn-primary">View More</Button>
			</div>
		</div>
	);
}
