import { Divider, ListItem, ListItemButton, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BiSupport } from "react-icons/bi"
import { BsFacebook } from "react-icons/bs"
import { FaViber } from "react-icons/fa"
import { TbBrandTelegram } from "react-icons/tb"

import logo from "../../../public/logo33.svg"
import Style from "./Footer.module.scss"

const navigate = [
	{ id: 1, name: "home", path: "/" },
	{ id: 2, name: "about_us", path: "/about" },
	// { id: 3, name: "directions", path: "/note" }, //"/direction"
	{ id: 4, name: "rules", path: "/rule" },
	{ id: 5, name: "parcels", path: "/parcel" },
	// { id: 6, name: "bus_rent", path: "/rent" },
	{ id: 7, name: "contact", path: "/contact" }
]
const collaboration = [{ id: 1, name: "managers", path: "/managers" }]
const collaboration2 = [{ id: 1, name: "bus_rent", path: "/rent" }]
const phones = [
	{ id: 1, name: "+380 87 777 77 77", path: "" },
	{ id: 2, name: "+380 87 777 77 77", path: "" },
	{ id: 3, name: "+380 87 777 77 77", path: "" },
	{ id: 4, name: "+380 87 777 77 77", path: "" }
]
const Footer = () => {
	const { t, i18n } = useTranslation(["footer", "header"])
	return (
		<Box bgcolor={"#031327"} className={Style.content}>
			<Container maxWidth={"xl"}>
				<Box className={Style.wrapper}>
					<Box mt={4}>
						<Grid container display={"flex"} flexDirection={"row"}>
							<Grid item lg={1} xl={1}></Grid>
							<Grid lg={2} xl={2} item>
								<Link href={"/"}>
									<Image width={90} height={90} src={logo} alt={"logo"} />
								</Link>
							</Grid>
							<Grid lg={2} xl={2} item>
								<Typography
									color={"white"}
									className={Style.title}
									variant={"h2"}
								>
									{t("nav")}
								</Typography>
								<Box>
									<List>
										{navigate.map((list) => (
											<ListItem
												sx={{ marginTop: "8px" }}
												key={list.id}
												disablePadding
											>
												<Link href={list.path}>
													<ListItemText
														className={Style.List_hover}
														primaryTypographyProps={{
															color: "#fff",
															fontSize: "14px",
															lineHeight: "15px",
															textTransform: "uppercase",
															fontWeight: "400"
														}}
														primary={t(list.name, { ns: "header" })}
													/>
												</Link>
											</ListItem>
										))}
									</List>
								</Box>
							</Grid>
							<Grid lg={2} xl={2} item>
								<Typography
									color={"white"}
									className={Style.title}
									variant={"h2"}
								>
									{t("cooperation")}
								</Typography>
								<List>
									{collaboration.map((list) => (
										<ListItem
											sx={{ marginTop: "8px" }}
											key={list.id}
											disablePadding
										>
											<Link href={list.path}>
												<ListItemText
													className={Style.List_hover}
													primaryTypographyProps={{
														color: "#fff",
														fontSize: "14px",
														lineHeight: "15px",
														textTransform: "uppercase",
														fontWeight: "400"
													}}
													primary={t(list.name)}
												/>
											</Link>
										</ListItem>
									))}
									{collaboration2.map((list) => (
										<ListItem
											sx={{ marginTop: "8px" }}
											key={list.id}
											disablePadding
										>
											<Link href={list.path}>
												<ListItemText
													className={Style.List_hover}
													primaryTypographyProps={{
														color: "#fff",
														fontSize: "14px",
														lineHeight: "15px",
														textTransform: "uppercase",
														fontWeight: "400"
													}}
													primary={t(list.name, { ns: "header" })}
												/>
											</Link>
										</ListItem>
									))}
								</List>
							</Grid>
							<Grid lg={2} xl={2} item>
								<Typography
									color={"white"}
									className={Style.title}
									variant={"h2"}
								>
									<Stack spacing={1} direction={"row"} alignItems={"center"}>
										<BiSupport size={28} color={"#FABA17"} />
										<span>{t("support")}</span>
									</Stack>
								</Typography>
								<Box>
									<List>
										{phones.map((list) => (
											<ListItem
												sx={{ marginTop: "8px" }}
												key={list.id}
												disablePadding
											>
												<Link href={list.path}>
													<ListItemText
														className={Style.List_hover}
														primaryTypographyProps={{
															color: "#fff",
															fontSize: "14px",
															lineHeight: "15px",
															textTransform: "uppercase",
															fontWeight: "400"
														}}
														primary={t(list.name)}
													/>
												</Link>
											</ListItem>
										))}
									</List>
									<Stack spacing={1} direction={"row"}>
										<IconButton className={Style.List_hover}>
											<TbBrandTelegram color={"white"} />
										</IconButton>
										<IconButton className={Style.List_hover}>
											<BsFacebook color={"white"} />
										</IconButton>
										<IconButton className={Style.List_hover}>
											<FaViber color={"white"} />
										</IconButton>
									</Stack>
								</Box>
							</Grid>
							<Grid lg={2} xl={2} item>
								<Typography
									color={"white"}
									className={Style.title}
									variant={"h2"}
								>
									{t("mobile_app")}
								</Typography>
							</Grid>
							<Grid item lg={1} xl={1}></Grid>
						</Grid>
					</Box>
					<Box>
						<Box>
							<Divider color={"#0B356A"} />
							<Box className={Style.copyright_content}>
								<Typography color={"white"} className={Style.copyright_text}>
									{t("copyright")}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	)
}

export default Footer
