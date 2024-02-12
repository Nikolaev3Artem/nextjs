import { useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import React, { useEffect } from "react"

import map from "../../../public/map_1920.jpg"
import theme from "../../theme"
import CardPopular from "./CardPopular"
import Style from "./Popular.module.scss"

const cards: any = [
	{ name1: "Львів", name2: "Албуфейра" },
	{ name1: "Львів", name2: "Евора" },
	{ name1: "Львів", name2: "Сантарен" },
	{ name1: "Львів", name2: "Фаро" },
	{ name1: "Львів", name2: "Авейру" },
	{ name1: "Львів", name2: "Лісабон" },
	{ name1: "Київ", name2: "Албуфейра" },
	{ name1: "Київ", name2: "Евора" },
	{ name1: "Київ", name2: "Сантарен" },
	{ name1: "Київ", name2: "Фаро" },
	{ name1: "Київ", name2: "Авейру" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" },
	{ name1: "Київ", name2: "Лісабон" }
]
let card: any = []

const Popular = () => {
	const { t } = useTranslation("popular")
	const xlOnly = useMediaQuery(theme.breakpoints.only("xl"))
	const lgOnly = useMediaQuery(theme.breakpoints.only("lg"))
	const mdOnly = useMediaQuery(theme.breakpoints.only("md"))
	const smOnly = useMediaQuery(theme.breakpoints.only("sm"))
	const xsOnly = useMediaQuery(theme.breakpoints.only("xs"))
	if (xlOnly) {
		card = cards.slice(0, 18)
	} else if (lgOnly) {
		card = cards.slice(0, 18)
	} else if (mdOnly) {
		card = cards.slice(0, 16)
	} else if (smOnly) {
		card = cards.slice(0, 8)
	} else if (xsOnly) {
		card = cards.slice(0, 4)
	} else {
		card = cards.slice(0, 18)
	}

	return (
		<Container disableGutters maxWidth={false}>
			<Container maxWidth={"xl"}>
				<Grid mt={6} container>
					<Grid item lg={1} xl={1}></Grid>
					<Grid item lg={10} xl={10}>
						<Typography className={Style.text} variant={"h2"}>
							{t("title")}
						</Typography>
					</Grid>
					<Grid item lg={1} xl={1}></Grid>
				</Grid>
			</Container>
			<Box mt={6} className={Style.content}>
				<Image
					style={{ objectFit: "cover" }}
					fill
					className={Style.map}
					src={map}
					alt={"Map"}
				></Image>
				<Container className={Style.card_content} maxWidth={"xl"}>
					<Grid container>
						<Grid item lg={1} xl={1}></Grid>
						<Grid item lg={10} xl={10}>
							<Grid
								container
								spacing={{ xs: 2, md: 3 }}
								columns={{ xs: 4, sm: 12, md: 8, lg: 12, xl: 12 }}
							>
								{card.map((i: any, index: number) => (
									<Grid item xs={12} sm={6} md={2} lg={2} xl={2} key={index}>
										<CardPopular name1={i.name1} name2={i.name2} />
									</Grid>
								))}
							</Grid>
						</Grid>
						<Grid item lg={1} xl={1}></Grid>
					</Grid>
				</Container>
			</Box>
		</Container>
	)
}

export default Popular
