import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import bg from "../../../public/bg.png"
import Banner from "../../component/Banner/Banner"
import LayoutContent from "../../component/Layout/Content/LayoutContent"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import RentCard from "../../component/Rent/Card/RentCard"
import { IBanner } from "../../interface/IBanner"
import { IRent } from "../../interface/IRent"
import { wrapper } from "../../store/store"
import Style from "../parcel/parcel.module.scss"
export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale
		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
		const rent = await axios.get<IRent>(`${BASE_URL}${locale}/api/rent/`)
		const res = response.data
		const rents = rent.data

		console.log(BASE_URL)

		return {
			props: {
				res,
				rents,
				...(locale && (await serverSideTranslations(locale)))
			}
		}
	}
)

export interface IRentProps {
	res: IBanner[]
	rents: IRent[]
}
const Index = ({ res, rents }: IRentProps) => {
	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					<Box className={Style.rule_content}>
						{res && res[0]?.is_active === true ? (
							<Banner
								img={res[0]?.img}
								alt={res[0]?.alt}
								h1={res[0]?.h1}
								description={res[0]?.description}
							/>
						) : (
							<Banner
								h1={res[0]?.h1}
								description={res[0]?.description}
								img={bg.src || ""}
								alt={"img"}
							/>
						)}
					</Box>
				</LayoutTopContent>
				<LayoutContent>
					<Stack width={"100%"} direction={"column"}>
						<Box>
							<Typography
								color={"darkslategray"}
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "24px",
									lineHeight: "140%"
								}}
								mb={4}
							>
								Оренда автобуса
							</Typography>
						</Box>
						<Grid container spacing={{ xs: 3, sm: 2, md: 3, lg: 2 }}>
							{rents.map((item) => (
								<Grid key={item.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
									<Box>
										<RentCard
											id={item.id}
											name={item.name}
											images={item.images}
											busIdService={item.busIdService}
											floor={item.floor}
											places={item.places}
											poster={item.poster}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					</Stack>
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}

export default Index
