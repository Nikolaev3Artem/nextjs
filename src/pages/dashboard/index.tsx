import { Fade } from "@mui/material"
import Box from "@mui/material/Box"
import axios from "axios/index"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import LayoutDashboard from "../../component/Layout/Dashboard/LayoutDashboard"
import { wrapper } from "../../store/store"

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

const Index = () => {
	return (
		<>
			<LayoutDashboard>
				<Fade in={true} timeout={400}>
					<Box>
						<h1>Admin</h1>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}

// Index.getLayout = (page: any) => <LayoutDashboard>{page}</LayoutDashboard>
export default Index
