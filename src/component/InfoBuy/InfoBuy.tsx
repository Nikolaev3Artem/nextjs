import {
	Card,
	CardContent,
	CardMedia,
	Fade,
	Stack,
	useMediaQuery
} from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import cn from "clsx"
import clsx from "clsx"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import React from "react"

import bus from "../../../public/bus.svg"
import map from "../../../public/map.svg"
import ticket from "../../../public/ticket.svg"
import theme from "../../theme"
import Style from "./InfoBuy.module.scss"

function InfoBuy() {
	const { t } = useTranslation("infobuy")
	const mdOnly = useMediaQuery(theme.breakpoints.only("md"))
	const lgOnly = useMediaQuery(theme.breakpoints.only("lg"))
	const adaptive = clsx({
		[Style.c]: mdOnly,
		[Style.lg__title]: lgOnly
	})

	return (
		<Box>
			<Container maxWidth='xl'>
				<Fade in={true} timeout={1000}>
					<Grid mt={6} container>
						<Grid item lg={1} xl={1}></Grid>
						<Grid item lg={10} xl={10}>
							<Box>
								<Typography
									color={"primary"}
									fontSize={32}
									fontWeight={700}
									variant={"h3"}
								>
									{t("title")}
								</Typography>
							</Box>
							<Grid mt={4} container flexDirection={"row"} spacing={2}>
								<Grid item sm={12} md={4} lg={4} xl={4}>
									<Card className={Style.card}>
										<Stack className={cn(adaptive, Style.r)} spacing={1}>
											<CardContent sx={{ padding: "0" }}>
												<Typography
													color={"white"}
													variant={"body2"}
													component={"span"}
													alignSelf={"center"}
												>
													{t("card_search")}
												</Typography>
											</CardContent>
											<CardMedia>
												<Image src={map} alt={"1"} width={90} height={90} />
											</CardMedia>
										</Stack>
									</Card>
								</Grid>
								<Grid item sm={12} md={4} lg={4} xl={4}>
									<Card className={Style.card}>
										<Stack className={cn(adaptive, Style.r)} spacing={1}>
											<CardContent sx={{ padding: "0" }}>
												<Typography
													color={"white"}
													variant={"body2"}
													component={"span"}
												>
													{t("card_data")}
												</Typography>
											</CardContent>
											<CardMedia>
												<Image src={bus} alt={"1"} width={90} height={90} />
											</CardMedia>
										</Stack>
									</Card>
								</Grid>
								<Grid item sm={12} md={4} lg={4} xl={4}>
									<Card className={Style.card}>
										<Stack className={cn(adaptive, Style.r)} spacing={1}>
											<CardContent sx={{ padding: "0" }}>
												<Typography
													alignSelf={"center"}
													color={"white"}
													variant={"body2"}
													component={"span"}
												>
													{t("card_mobile")}
												</Typography>
											</CardContent>
											<CardMedia>
												<Image src={ticket} alt={"1"} width={90} height={90} />
											</CardMedia>
										</Stack>
									</Card>
								</Grid>
							</Grid>
						</Grid>
						<Grid item lg={1} xl={1}></Grid>
					</Grid>
				</Fade>
			</Container>
		</Box>
	)
}

export default InfoBuy
