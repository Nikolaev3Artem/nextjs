import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Logout from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { Fade } from "@mui/material"
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
import cn from "clsx"
import Cookies from "js-cookie"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

import { IProfile } from "../../../interface/IUser"
import { setDrawer } from "../../../store/admin/drawerSlice"
import { useAppDispatch, useAppSelector } from "../../../store/auth/redux"
import { useGetUserQuery, userApi } from "../../../store/auth/user.api"
import { removeUser, setUser } from "../../../store/auth/userSlice"
import { CurrencySelect } from "../../Currency/CurrencySelect"
import { LocaleChange } from "../../Locale/LocaleChange"
import Style from "../../Navbar/navbar.module.scss"

const settings = [
	{ id: 1, name: "profile", path: "/profile" },
	{ id: 2, name: "my_tickets", path: "/order" }
]

const NavBarAdmin = () => {
	const { t } = useTranslation("header")

	// const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	)

	// const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorElNav(event.currentTarget)
	// }
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	// const handleCloseNavMenu = () => {
	// 	setAnchorElNav(null)
	// }

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

	const open: boolean = useAppSelector((state) => state.drawer.open)

	const drawerOpen = cn({
		[Style.navbar_open]: open
	})
	const handleDrawerOpen = () => {
		dispatch(setDrawer())
	}

	return (
		<AppBar
			color={"primary"}
			className={cn(drawerOpen, Style.navbar)}
			position='fixed'
			elevation={0}
		>
			<Toolbar disableGutters>
				<Container maxWidth={false}>
					<Grid container direction='row' alignItems='center'>
						<Grid display='flex' justifyContent='flex-start' item lg={1} xl={1}>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								onClick={handleDrawerOpen}
								edge='start'
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>
						</Grid>

						<Grid display='flex' justifyContent='flex-end' item lg={11} xl={11}>
							<Box display={"flex"} mr={2}>
								<CurrencySelect />
								<LocaleChange />
							</Box>
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
												sx={{ ml: 2, mr: 0.5 }}
												className={Style.navbar__text}
												variant={"body2"}
												component={"a"}
												color={"white"}
											>
												{user && user[0]?.user.email}
											</Typography>
											<KeyboardArrowDownIcon
												className={anchorElUser ? Style.active : Style.arrow}
											/>
										</Button>

										<Menu
											sx={{ mt: "45px" }}
											id='menu-appbar'
											anchorEl={anchorElUser}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right"
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right"
											}}
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
								<></>
							)}
						</Grid>

						{/*<Box*/}
						{/*	sx={{*/}
						{/*		flexGrow: 1,*/}
						{/*		display: { xs: "flex", md: "none" }*/}
						{/*	}}*/}
						{/*>*/}
						{/*	<IconButton*/}
						{/*		size='large'*/}
						{/*		aria-label='account of current user'*/}
						{/*		aria-controls='menu-appbar'*/}
						{/*		aria-haspopup='true'*/}
						{/*		onClick={handleOpenNavMenu}*/}
						{/*		color='inherit'*/}
						{/*	>*/}
						{/*		<MenuIcon />*/}
						{/*	</IconButton>*/}
						{/*	<Menu*/}
						{/*		id='menu-appbar'*/}
						{/*		anchorEl={anchorElNav}*/}
						{/*		anchorOrigin={{*/}
						{/*			vertical: "bottom",*/}
						{/*			horizontal: "left"*/}
						{/*		}}*/}
						{/*		keepMounted*/}
						{/*		transformOrigin={{*/}
						{/*			vertical: "top",*/}
						{/*			horizontal: "left"*/}
						{/*		}}*/}
						{/*		open={Boolean(anchorElNav)}*/}
						{/*		onClose={handleCloseNavMenu}*/}
						{/*		sx={{*/}
						{/*			display: { xs: "block", md: "none" }*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<MenuItem onClick={handleLogout}>*/}
						{/*			<Typography textAlign='center'>{t("sign_out")}</Typography>*/}
						{/*		</MenuItem>*/}
						{/*	</Menu>*/}
						{/*</Box>*/}
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default NavBarAdmin
