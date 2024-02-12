import { Fade, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { getCookie } from "cookies-next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Error from "next/error"
import { useRouter } from "next/router"
import React from "react"
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai"

import RentTable from "../../../component/Dashboard/Rent/Table/RentTable"
import ContentDashboard from "../../../component/Layout/Dashboard/Content/ContentDashboard"
import LayoutDashboard from "../../../component/Layout/Dashboard/LayoutDashboard"
import TabMenuLocale from "../../../component/Layout/Dashboard/TabMenuLocale/TabMenuLocale"
import { IBanner } from "../../../interface/IBanner"
import { IRent } from "../../../interface/IRent"
import { wrapper } from "../../../store/store"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale
		const response = await fetch(`${BASE_URL}${locale}/api/rent/admin/`, {
			headers: {
				Authorization: "Bearer " + context.req.cookies.access
			}
		})
		const errorCode = response.ok ? false : response.status
		const rents = await response.json()

		return {
			props: {
				errorCode,
				rents,
				...(locale &&
					(await serverSideTranslations(locale, ["dashboard", "header"])))
			}
		}
	}
)

export interface IRentProps {
	errorCode: any
	res?: IBanner[]
	rents: IRent[]
}
const Index = ({ rents, errorCode }: IRentProps) => {
	const rout = useRouter()
	if (errorCode) {
		typeof window !== "undefined" && rout.push("/auth")
		return <Error statusCode={errorCode} title={errorCode.title} />
	}
	const { t } = useTranslation("header")

	function AddCard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation()
		rout.push("rent/add/")
	}

	return (
		<>
			<LayoutDashboard>
				<Fade in={true} timeout={600}>
					<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
						<ContentDashboard title={"rent"}>
							<Stack
								mb={3}
								sx={{ width: "100%" }}
								direction={"row"}
								justifyContent={"space-between"}
								display={"flex"}
							>
								<TextField
									sx={{
										backgroundColor: "#fff",
										minWidth: "300px",
										borderRadius: "4px"
									}}
									size={"small"}
									id='outlined-basic'
									label='Пошук...'
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<AiOutlineSearch />
											</InputAdornment>
										)
									}}
								/>
								<Button
									color={"secondary"}
									variant={"contained"}
									onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
										AddCard(event)
									}
									startIcon={<AiOutlinePlus />}
								>
									{t("rent_button_form")}
								</Button>
							</Stack>
							<RentTable rents={rents} />
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}

export default Index
