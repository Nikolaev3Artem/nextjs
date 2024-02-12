import { ListItemButton } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { blue } from "@mui/material/colors"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { AiFillHome, AiOutlineSearch } from "react-icons/ai"
import {
	BsBoxFill,
	BsFillGeoAltFill,
	BsTicketPerforatedFill
} from "react-icons/bs"
import { FaBus, FaUser } from "react-icons/fa"
import { HiTicket } from "react-icons/hi2"
import {
	MdDashboard,
	MdLocationCity,
	MdOutlineEventNote,
	MdOutlineRoute,
	MdSpeakerNotes
} from "react-icons/md"
import { TbBus } from "react-icons/tb"

import logo from "../../../../public/logo33.svg"
import { useAppDispatch, useAppSelector } from "../../../store/auth/redux"
import theme from "../../../theme"
import Style from "./Drawer.module.scss"

const drawerWidth = 240
const primary = theme.palette.primary.main

const navUser = [
	{ id: 1, name: "profile", path: "/profile", icon: <FaUser /> },
	{
		id: 2,
		name: "my_tickets",
		path: "/order",
		icon: <BsTicketPerforatedFill />
	}
]
const navAdmin = [
	{ id: 1, name: "dashboard", path: "/dashboard", icon: <MdDashboard /> },
	{ id: 2, name: "tickets", path: "/#", icon: <HiTicket /> },
	{ id: 3, name: "bus", path: "/#", icon: <FaBus /> },
	{ id: 4, name: "city", path: "/#", icon: <MdLocationCity /> },
	{ id: 5, name: "rout", path: "/#", icon: <MdOutlineRoute /> },
	{ id: 6, name: "flights", path: "/#", icon: <TbBus /> }
]

const navAdminMain = [
	{ id: 1, name: "home", path: "/dashboard/home", icon: <AiFillHome /> },
	{
		id: 2,
		name: "about_us",
		path: "/dashboard/about",
		icon: <MdSpeakerNotes />
	},
	{
		id: 3,
		name: "rules",
		path: "/dashboard/rule",
		icon: <MdOutlineEventNote />
	},
	{ id: 4, name: "parcels", path: "/dashboard/parcel", icon: <BsBoxFill /> },
	{ id: 5, name: "bus_rent", path: "/dashboard/rent", icon: <FaBus /> },
	{
		id: 6,
		name: "contact",
		path: "/dashboard/contact",
		icon: <BsFillGeoAltFill />
	}
]

interface IChildren {
	children: React.ReactNode
}

const DrawerHeader = styled("div")(({ theme }) => {
	return {
		alignItems: "center",
		display: "flex",
		justifyContent: "flex-end",
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		padding: theme.spacing(0, 1)
	}
})

const color_active = blue[300]

export default function DrawerLeft({ children }: IChildren) {
	const { t } = useTranslation(["dashboard", "header"])
	const is_superuser: boolean = useAppSelector(
		(state) => state.user.user[0]?.user.is_superuser
	)
	const open: any = useAppSelector((state) => state.drawer.open)
	const router = useRouter()

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				className={Style.drawer}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						backgroundColor: primary,
						width: drawerWidth,
						boxSizing: "border-box"
					}
				}}
				variant='persistent'
				anchor='left'
				open={open}
			>
				<DrawerHeader>
					<Box mt={2} display={"flex"} justifyContent={"center"} width={"100%"}>
						<Link href={"/"}>
							<Image
								priority={true}
								width={60}
								height={60}
								src={logo}
								alt={"logo"}
							/>
						</Link>
					</Box>
				</DrawerHeader>

				<Box px={2} my={2}>
					<Link href={"/"}>
						<Button
							sx={{
								height: "44px",
								fontWeight: "400",
								textTransform: "none",
								fontSize: "14px"
							}}
							fullWidth
							startIcon={<AiOutlineSearch />}
							color={"secondary"}
							variant={"contained"}
						>
							{t("search_ticket")}
						</Button>
					</Link>
				</Box>
				{!is_superuser ? (
					<List>
						{navUser.map((text) => (
							<Link key={text.id} href={text.path}>
								<ListItemButton
									sx={{
										"&.Mui-selected": {
											backgroundColor: theme.palette.primary.dark,
											span: {
												color: theme.palette.warning.main
											},
											svg: {
												color: theme.palette.warning.main
											}
										},
										"&.MuiListItemButton-root": {
											"&:hover": {
												backgroundColor: theme.palette.primary.dark
											}
										}
									}}
								>
									<ListItemIcon
										sx={{
											color: theme.palette.background.paper,
											fontSize: "18px"
										}}
									>
										{text.icon}
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											color: theme.palette.background.paper,
											fontWeight: 300
										}}
										primary={t(`${text.name}`, { ns: "header" })}
									/>
								</ListItemButton>
							</Link>
						))}
					</List>
				) : (
					<>
						<List>
							{navAdmin.map((text) => (
								<Link key={text.id} href={text.path}>
									<ListItemButton
										selected={router.pathname === text.path}
										sx={{
											"&.Mui-selected": {
												backgroundColor: theme.palette.primary.dark,
												span: {
													color: color_active
												},
												svg: {
													color: color_active
												}
											},
											"&.MuiListItemButton-root": {
												"&:hover": {
													backgroundColor: theme.palette.primary.dark
												}
											}
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: "40px",
												color: theme.palette.background.paper,
												fontSize: "18px"
											}}
										>
											{text.icon}
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{
												color: theme.palette.background.paper,
												fontWeight: 400,
												fontSize: "14px"
											}}
											primary={t(`${text.name}`)}
										/>
									</ListItemButton>
								</Link>
							))}
						</List>
						<List>
							{navAdminMain.map((text) => (
								<Link key={text.id} href={text.path}>
									<ListItemButton
										sx={{
											"&.Mui-selected": {
												backgroundColor: theme.palette.primary.dark,
												span: {
													color: color_active
												},
												svg: {
													color: color_active
												}
											},
											"&.MuiListItemButton-root": {
												"&:hover": {
													backgroundColor: theme.palette.primary.dark
												}
											}
										}}
										selected={router.pathname === text.path}
									>
										<ListItemIcon
											sx={{
												minWidth: "40px",
												color: theme.palette.background.paper,
												fontSize: "18px"
											}}
										>
											{text.icon}
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{
												color: theme.palette.background.paper,
												fontWeight: 400,
												fontSize: "14px"
											}}
											primary={t(`${text.name}`, { ns: "header" })}
										/>
									</ListItemButton>
								</Link>
							))}
						</List>
					</>
				)}
			</Drawer>
			{children}
		</Box>
	)
}
