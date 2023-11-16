"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
	UseTranslationOptions,
	initReactI18next,
	useTranslation as useTranslationOrg
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./setting";

const runsOnServerSide = typeof window === "undefined";

i18next
	.use(initReactI18next)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`./locales/${language}/${namespace}.json`)
		)
	)
	.init({
		...getOptions(),
		lng: "cn", // let detect the language on client side
		detection: {
			order: ["path", "htmlTag", "cookie", "navigator"]
		}
	});

export function useTranslation(lng: string, ns: string, options?: UseTranslationOptions<string>) {
	const ret = useTranslationOrg(ns, options);
	const { i18n } = ret;
	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng);
	}
	const [activeLng, setActiveLng] = useState(lng);
	useEffect(() => {
		if (activeLng === i18n.resolvedLanguage) return;
		setActiveLng(i18n.resolvedLanguage!);
	}, [activeLng, i18n.resolvedLanguage]);
	useEffect(() => {
		if (!lng || i18n.resolvedLanguage === lng) return;
		i18n.changeLanguage(lng);
	}, [lng, i18n]);
	return ret;
}
