import { Fade } from "@mui/material"
import Box from "@mui/material/Box"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import ContentDashboard from "../../../component/Layout/Dashboard/Content/ContentDashboard"
import LayoutDashboard from "../../../component/Layout/Dashboard/LayoutDashboard"
import TabMenuLocale from "../../../component/Layout/Dashboard/TabMenuLocale/TabMenuLocale"
import { IBanner } from "../../../interface/IBanner"
import { wrapper } from "../../../store/store"
import Form from "../../../component/Dashboard/Home/Form/Form"

interface IBannerProps {
	res?: IBanner[]
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale

		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)

		const res: IBanner = response.data

		return {
			props: {
				res,
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
						<ContentDashboard title={"home"}>
							<TabMenuLocale>
								<Form />
							</TabMenuLocale>
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}
