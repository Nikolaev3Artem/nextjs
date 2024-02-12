import { Stack } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

import pt from "../../static/pt.svg"
import uk from "../../static/svg/uk.svg"

interface ILocale {
	id: number
	title: string
	lang: string
	icon?: string
	min_title: string
}

interface ILocales {
	locales?: string[] | undefined
}

const locales = [
	{
		id: 1,
		title: "Українська",
		min_title: "Укр",
		icon: "ua",
		lang: "uk"
	},
	{ id: 2, title: "English", min_title: "EN", icon: "us", lang: "en" },
	{ id: 3, title: "Português", min_title: "PT", icon: "pt", lang: "pt" },
	{ id: 4, title: "Lietuvių", min_title: "LT", icon: "lt", lang: "lt" }
]

const options = ["ua", "en", "pt"]

export const LocaleSelect = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [selectedIndex, setSelectedIndex] = React.useState<number>(1)
	useEffect(() => {
		function getLang() {
			if (Cookies.get("id")) {
				const land_id: any = Cookies.get("id")
				setSelectedIndex(parseInt(land_id))
			} else {
				setSelectedIndex(1)
			}
		}

		getLang()
		return () => {}
	}, [selectedIndex])
	const open = Boolean(anchorEl)
	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const router = useRouter()
	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLElement>,
		id: number,
		lang: string
	) => {
		setSelectedIndex(id)
		setAnchorEl(null)
		Cookies.set("lang", lang)
		Cookies.set("id", id.toString())
		router.reload()
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLang = () => {
		const data = locales.filter((item) => item.id === selectedIndex)
		const lang = data[0].min_title
		return lang
	}
	const handleCode = () => {
		const data = locales.filter((item) => item.id === selectedIndex)
		const item = data[0]
		return item
	}
	return (
		<div>
			<List component='nav' aria-label='Device settings'>
				<ListItem
					button
					id='lock-button'
					aria-haspopup='listbox'
					aria-controls='lock-menu'
					aria-label='when device is locked'
					aria-expanded={open ? "true" : undefined}
					onClick={handleClickListItem}
				>
					<Stack direction='row' spacing={1}>
						{/*<LanguageIcon />*/}

						<ListItemText
							disableTypography={true}
							sx={{
								color: "white",
								fontSize: "14px",
								fontWeight: "600",
								fontFamily: "Inter"
							}}
							secondary={handleLang()}
						/>
						{/*<Image height={"16"} width={"24"} src={handleCode()} />*/}
					</Stack>
				</ListItem>
			</List>
			<Menu
				id='lock-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "lock-button",
					role: "listbox"
				}}
			>
				{locales.map((option: ILocale) => (
					<MenuItem
						sx={{
							accentColor: "#556376",
							display: "flex",
							flexDirection: "colum"
						}}
						key={option.lang}
						disabled={option.id === 0}
						selected={option.id === selectedIndex}
						onClick={(event) =>
							handleMenuItemClick(event, option.id, option.lang)
						}
					>
						<img
							width={"24"}
							src={`https://flagcdn.com/${option.icon?.toLowerCase()}.svg`}
						></img>
						<Typography sx={{ ml: "8px" }}>{option.title}</Typography>
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
