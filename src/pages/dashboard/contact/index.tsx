import React from "react"
import LayoutDashboard from "../../../component/Layout/Dashboard/LayoutDashboard"
import { Fade } from "@mui/material"
import Box from "@mui/material/Box"
import ContentDashboard from "../../../component/Layout/Dashboard/Content/ContentDashboard"
import TabMenuLocale from "../../../component/Layout/Dashboard/TabMenuLocale/TabMenuLocale"
import RuleForm from "../../../component/Dashboard/Rule/Form/RuleForm"
import { wrapper } from "../../../store/store"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContactForm from "../../../component/Dashboard/Contact/Form/ContactForm"

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
				<Fade in={true} timeout={600}>
					<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
						<ContentDashboard title={"contact"}>
							<TabMenuLocale>
								<ContactForm />
							</TabMenuLocale>
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}

export default Index
