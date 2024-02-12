import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Logout from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { Fade, Stack } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Cookies from "js-cookie"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { useEffect } from "react"

import logo from "../../../public/logo33.svg"
import { IProfile } from "../../interface/IUser"
import { setDrawer } from "../../store/admin/drawerSlice"
import { useAppDispatch, useAppSelector } from "../../store/auth/redux"
import { useGetUserQuery, userApi } from "../../store/auth/user.api"
import { removeUser, setUser } from "../../store/auth/userSlice"
import { CurrencySelect } from "../Currency/CurrencySelect"
import { LocaleChange } from "../Locale/LocaleChange"
import Style from "./navbar.module.scss"

const pages = [
	{ id: 1, name: "home", path: "/" },
	{ id: 2, name: "about_us", path: "/about" },
	// { id: 3, name: "directions", path: "/note" }, //"/direction"
	{ id: 4, name: "rules", path: "/rule" },
	{ id: 5, name: "parcels", path: "/parcel" },
	{ id: 6, name: "bus_rent", path: "/rent" },
	{ id: 7, name: "contact", path: "/contact" }
]

const settings = [
	{ id: 1, name: "profile", path: "/profile" },
	{ id: 2, name: "my_tickets", path: "/order" },
	{ id: 3, name: "admin", path: "/dashboard" }
]

const ResponsiveAppBar = () => {
	const { t } = useTranslation("header")

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	const dispatch = useAppDispatch()
	const router = useRouter()

	const handleLogout = () => {
		handleCloseUserMenu()
		Cookies.remove("access")
		dispatch(removeUser(""))
		dispatch(userApi.util.resetApiState())
		router.push("/auth").then()
	}
	// const token = useAppSelector((state) => state.token.access)
	const user: IProfile[] = useAppSelector((state) => state.user.user)

	const { data, isLoading, isSuccess } = useGetUserQuery("")

	useEffect(() => {
		if (data) {
			dispatch(setUser(data))
		}
	}, [data])

	return (
		<AppBar color={"primary"} className={Style.navbar} position='static'>
			<Toolbar disableGutters>
				<Container maxWidth={"xl"}>
					<Grid container direction='row' alignItems='center'>
						<Grid
							display='flex'
							justifyContent='flex-start'
							alignItems={"center"}
							item
							md={1}
							lg={1}
							xl={1}
						>
							<Link href={"/"}>
								<Image
									priority={true}
									width={40}
									height={40}
									src={logo}
									alt={"logo"}
								/>
							</Link>
						</Grid>
						<Grid display='flex' justifyContent='flex-start' item lg={6} xl={7}>
							<Box
								sx={{
									flexGrow: 1,
									display: { xs: "none", md: "flex" }
								}}
							>
								{pages.map((page) => (
									<Link key={page.id} href={page.path} passHref>
										<Button
											component={"span"}
											onClick={handleCloseNavMenu}
											sx={{
												color: "white",
												fontSize: 13,
												textTransform: "uppercase",
												fontFamily: "Inter",
												fontWeight: 300
											}}
										>
											{t(page.name)}
										</Button>
									</Link>
								))}
							</Box>
						</Grid>
						<Grid display='flex' justifyContent='flex-end' item lg={2} xl={2}>
							<Stack direction={"row"}>
								<CurrencySelect />
								<LocaleChange />
							</Stack>
						</Grid>
						<Grid display='flex' justifyContent='flex-end' item lg={3} xl={2}>
							{isLoading ? (
								<></>
							) : user && isSuccess ? (
								<Fade in={user.length > 0} appear={false}>
									<Box
										sx={{
											flexGrow: 0,
											display: "flex",
											alignItems: "center"
										}}
									>
										<Button
											onClick={handleOpenUserMenu}
											variant={"text"}
											color={"inherit"}
										>
											{/*<Avatar src={user[0]?.logo} alt='Remy Sharp' />*/}
											<Typography
												sx={{
													ml: 2,
													mr: 0.5,
													textTransform: "none",
													color: "#fff",
													fontSize: 13,
													fontFamily: "Inter",
													fontWeight: 300
												}}
												className={Style.navbar__text}
												component={"a"}
												color={"white"}
											>
												{user && user[0]?.user.email}
											</Typography>
											<KeyboardArrowDownIcon
												sx={{ fontSize: 22 }}
												className={anchorElUser ? Style.active : Style.arrow}
											/>
										</Button>

										<Menu
											sx={{ mt: "45px" }}
											id='menu-appbar'
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right"
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right"
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											{settings.map((setting) => (
												<MenuItem
													key={setting.id}
													onClick={handleCloseUserMenu}
												>
													<Link href={setting.path}>
														<Typography component={"span"} textAlign='center'>
															{t(setting.name)}
														</Typography>
													</Link>
												</MenuItem>
											))}
											<MenuItem onClick={handleLogout}>
												<Typography component={"span"} textAlign='center'>
													<ListItemIcon>
														<Logout fontSize='small' />
													</ListItemIcon>
													{t("sign_out")}
												</Typography>
											</MenuItem>
										</Menu>
									</Box>
								</Fade>
							) : (
								<Fade in appear={false}>
									<Box>
										<Stack direction='row' spacing={2}>
											<Link href={"/auth"}>
												<Button
													// href={"/auth"}
													sx={{
														fontWeight: "400",
														minWidth: "104px",
														color: "#ffffff",
														textTransform: "none"
													}}
													variant={"text"}
												>
													{t("sign_in")}
												</Button>
											</Link>
											<Link href={"/auth/registration"}>
												<Button
													color={"secondary"}
													sx={{
														fontWeight: "400",
														minWidth: "131px",
														textTransform: "none"
													}}
													variant={"contained"}
												>
													{t("registration")}
												</Button>
											</Link>
										</Stack>
									</Box>
								</Fade>
							)}
						</Grid>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" }
							}}
						>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" }
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.id} onClick={handleCloseNavMenu}>
										<Link href={page.path} passHref>
											<Typography sx={{}} textAlign='center'>
												{t(page.name)}
											</Typography>
										</Link>
									</MenuItem>
								))}
								<MenuItem onClick={handleLogout}>
									<Typography textAlign='center'>{t("sign_out")}</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	)
}
export default ResponsiveAppBar
