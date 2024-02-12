import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import { grey } from "@mui/material/colors"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import React from "react"

import Signup from "../../component/Auth/Signup/Signup"
import LayoutLogin from "../../component/Layout/Auth/LayoutLogin"
import { LocaleChange } from "../../component/Locale/LocaleChange"
import { wrapper } from "../../store/store"

const colorLogin = grey[700]

function Registration() {
	const { t } = useTranslation("header")
	return (
		<LayoutLogin>
			<Stack direction={"column"} sx={{ margin: "auto" }}>
				<Signup />
				<Stack
					mt={1}
					display={"flex"}
					alignItems={"center"}
					spacing={1}
					direction={"row"}
				>
					<LocaleChange weight={"500"} color={colorLogin} />
					<Link href={"/"}>
						<Button
							sx={{ textTransform: "none", color: colorLogin }}
							variant={"text"}
						>
							{t("home")}
						</Button>
					</Link>
					<Link href={"/about"}>
						<Button
							sx={{ textTransform: "none", color: colorLogin }}
							variant={"text"}
						>
							{t("about_us")}
						</Button>
					</Link>
					<Link href={"/contact"}>
						<Button
							sx={{ textTransform: "none", color: colorLogin }}
							variant={"text"}
						>
							{t("contact")}
						</Button>
					</Link>
				</Stack>
				{/*	/!*{new Date().getFullYear()}*!/*/}
			</Stack>
		</LayoutLogin>
	)
}

export default Registration

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const locale = context.locale
		return {
			props: {
				...(locale && (await serverSideTranslations(locale)))
			}
		}
	}
)
