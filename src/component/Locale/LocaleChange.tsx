import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
// import { active, arrow } from "./locale.Drawer.module.scss"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { ListItemButton, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import clsx from "clsx"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

import style from "./locale.module.scss"

interface IColor {
	color?: string
	weight?: string
}

const lang = [
	{
		id: 1,
		title: "Українська",
		min_title: "Укр",
		icon: "uk",
		lang: "uk"
	},
	{ id: 2, title: "English", min_title: "EN", icon: "en", lang: "en" },
	{ id: 3, title: "Português", min_title: "PT", icon: "pt", lang: "pt" },
	{ id: 4, title: "Lietuvių", min_title: "LT", icon: "lt", lang: "lt" }
]

const cache = createCache({
	key: "css"
})

export function LocaleChange({ color, weight }: IColor) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [selectedIndex, setSelectedIndex] = React.useState<number>(1)
	// useEffect(() => {
	//     function getlocale() {
	//         if (Cookies.get("id")) {
	//             const land_id: any = Cookies.get("id")
	//             setSelectedIndex(parseInt(land_id))
	//         } else {
	//             setSelectedIndex(1)
	//         }
	//     }
	//
	//     getlocale()
	//     return () => {}
	// }, [selectedIndex])
	const open = Boolean(anchorEl)
	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const router = useRouter()
	const { locale: activeLocale, pathname, query, asPath } = router

	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLElement>,
		id: number,
		lang?: string
	) => {
		setSelectedIndex(id)
		setAnchorEl(null)
		// Cookies.set("locale", locale)
		// Cookies.set("id", index.toString())
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const getLocalTitle = () => {
		const data = lang.filter((item) => item.lang === activeLocale)
		const locale = data[0]?.min_title
		return locale
	}
	const getCode = () => {
		const data = lang.filter((item) => item.lang === activeLocale)
		const icon = data[0]?.icon
		return icon
	}

	return (
		<>
			<CacheProvider value={cache}>
				<Box sx={{ display: "flex" }}>
					<ListItem disableGutters disablePadding>
						<Button
							sx={{
								textTransform: "none",
								color: "#fff",
								fontSize: 13,
								fontFamily: "Inter",
								fontWeight: 300
							}}
							variant={"text"}
							size={"small"}
							id='lock-button_locale'
							aria-haspopup='listbox'
							aria-controls='lock-menu2'
							aria-expanded={open ? "true" : undefined}
							onClick={handleClickListItem}
						>
							<ListItemText
								sx={{
									display: "flex",
									alignItems: "center",
									mr: "4px"
								}}
								secondaryTypographyProps={{
									fontWeight: weight,
									color: color,
									ml: "8px"
								}}
								primaryTypographyProps={{
									alignItems: "center",
									display: "flex"
								}}
								primary={
									<Image
										height={14}
										width={24}
										src={`/${getCode()}.svg`}
										alt='flag'
										priority
									/>
								}
								secondary={getLocalTitle()}
							/>
							<KeyboardArrowDownIcon
								sx={{ color: color, fontSize: 22 }}
								className={open ? style.active : style.arrow}
							/>
						</Button>
					</ListItem>
					<Menu
						id='lock-menu2'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "lock-button_locale",
							role: "listbox"
						}}
					>
						{lang?.map((option) => (
							<Link
								href={{ pathname, query }}
								as={asPath}
								locale={option.lang}
								key={option.id}
							>
								<MenuItem
									disabled={option.id === 0}
									selected={option.icon === activeLocale}
									onClick={(event) => handleMenuItemClick(event, option.id)}
								>
									<Image
										height={14}
										width={24}
										src={`/${option.icon}.svg`}
										alt='flag'
									/>
									<Typography sx={{ ml: "8px" }}>{option.title}</Typography>
								</MenuItem>
							</Link>
						))}
					</Menu>
				</Box>
			</CacheProvider>
		</>
	)
}
