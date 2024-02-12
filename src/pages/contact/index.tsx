import Typography from "@mui/material/Typography"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import LayoutContent from "../../component/Layout/Content/LayoutContent"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import { wrapper } from "../../store/store"

function Index() {
	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					<Typography
						style={{ display: "flex", color: "#663234", fontSize: "40px" }}
					>
						Контакти
					</Typography>
				</LayoutTopContent>
				<LayoutContent>1</LayoutContent>
			</LayoutDefault>
		</>
	)
}

export default Index

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
