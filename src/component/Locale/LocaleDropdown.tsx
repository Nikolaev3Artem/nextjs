import React, { useRef } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { setLocales } from "../../store/localeSlice"
import { useAppDispatch } from "../../store/auth/redux"
import { Router, useRouter } from "next/router"
import LanguageIcon from "@mui/icons-material/Language"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

interface ILocale {
    id: number
    name: string
    lang: string
}

const LocaleDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const router = useRouter()
    const locales = [
        { id: 1, name: "UA", lang: "uk" },
        { id: 2, name: "EN", lang: "en" },
        { id: 3, name: "PT", lang: "pt" },
    ] as const
    const handleClose = () => {
        setAnchorEl(null)
    }
    const dispatch = useAppDispatch()
    const selectLocale = (item: ILocale) => {
        dispatch(setLocales(item.lang))
        localStorage.setItem("lang", item.lang)
        handleClose()
        router.reload()
    }

    return (
        <div>
            <Button onClick={handleClick}>
                <LanguageIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {locales.map((item: ILocale) => (
                    <MenuItem
                        value={item.lang}
                        key={item.id}
                        onClick={() => selectLocale(item)}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default LocaleDropdown
