import { Fade } from "@mui/material"
import Box from "@mui/material/Box"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import ContentDashboard from "../../../component/Layout/Dashboard/Content/ContentDashboard"
import LayoutDashboard from "../../../component/Layout/Dashboard/LayoutDashboard"
import TabMenuLocale from "../../../component/Layout/Dashboard/TabMenuLocale/TabMenuLocale"
import { wrapper } from "../../../store/store"
import Form from "../../../component/Dashboard/Home/Form/Form"
import AboutForm from "../../../component/Dashboard/About/Form/AboutForm"
import { useRouter } from "next/router"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const locale = context.locale

		return {
			props: {
				...(locale &&
					(await serverSideTranslations(locale, ["dashboard", "header"])))
			}
		}
	}
)

export default function Index() {
	return (
		<>
			<LayoutDashboard>
				<Fade in={true} timeout={600}>
					<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
						<ContentDashboard title={"about"}>
							<TabMenuLocale>
								<AboutForm />
							</TabMenuLocale>
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}
