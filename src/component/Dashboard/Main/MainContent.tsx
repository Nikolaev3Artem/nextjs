import Box from "@mui/material/Box"
import cn from "clsx"
import React from "react"

import { useAppSelector } from "../../../store/auth/redux"
import Style from "./maincontent.module.scss"

export interface IMainContent {
	children: React.ReactNode
}

const MainContent = ({ children }: IMainContent) => {
	const open: any = useAppSelector((state) => state.drawer.open)
	const mainOpen = cn({
		[Style.main_open]: open
	})
	return <Box className={cn(mainOpen, Style.main_content)}>{children}</Box>
}

export default MainContent
