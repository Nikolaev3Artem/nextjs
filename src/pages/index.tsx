import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import * as React from "react"
import { AiOutlineSearch } from "react-icons/ai"

import bg from "../../public/bg.png"
import Banner from "../component/Banner/Banner"
import LayoutContent from "../component/Layout/Content/LayoutContent"
import LayoutDefault from "../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../component/Layout/TopContent/LayoutTopContent"
import DatePicker from "../component/Order/Datapicker/Datapicker"
import Input from "../component/Order/Input/Input"
import { IBanner } from "../interface/IBanner"
import { getMain } from "../store/main/main.api"
import { wrapper } from "../store/store"
import Style from "./Home.module.scss"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale

		await store.dispatch(getMain.initiate(""))

		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
		const res: IBanner = response.data

		return {
			props: {
				res,
				...(locale &&
					(await serverSideTranslations(locale, [
						"footer",
						"header",
						"main",
						"infobuy",
						"popular"
					])))
			}
		}
	}
)

export interface IBannerProps {
	res?: IBanner[]
}

export default function Home({ res }: IBannerProps) {
	const { t } = useTranslation("main")

	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					<Box className={Style.content}>
						{res && res[0]?.is_active === true ? (
							<Banner
								img={res[0]?.img}
								alt={res[0]?.alt}
								h1={res[0]?.h1}
								description={res[0]?.description}
							/>
						) : (
							<Banner
								h1={(res && res[0]?.h1) || ""}
								description={(res && res[0]?.description) || ""}
								img={bg.src || ""}
								alt={"img"}
							/>
						)}
					</Box>
				</LayoutTopContent>
				<LayoutContent>
					<Container maxWidth={false}>
						<Box>
							<Typography
								mb={2}
								className={Style.title}
								color={"primary"}
								variant={"h2"}
							>
								{t("search_title")}
							</Typography>
						</Box>
						<Grid flexDirection={"row"} display={"flex"} container>
							<Grid item lg={7} xl={7}>
								<Input />
							</Grid>

							<Grid item lg={3} xl={3}>
								<DatePicker />
							</Grid>
							<Grid item lg={2} xl={2}>
								<Button
									sx={{
										height: "54px",
										fontWeight: "400",
										textTransform: "none",
										fontSize: "16px"
									}}
									startIcon={<AiOutlineSearch />}
									fullWidth
									variant={"contained"}
									color={"secondary"}
								>
									{t("search_btn")}
								</Button>
							</Grid>
						</Grid>
					</Container>
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}
