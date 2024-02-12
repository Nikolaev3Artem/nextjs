import { Fade } from "@mui/material"
import React from "react"

import DrawerLeft from "../../Dashboard/Drawer/DrawerLeft"
import MainContent from "../../Dashboard/Main/MainContent"
import NavBarAdmin from "../../Dashboard/NavBar/NavBarAdmin"

interface ILayoutDashboardProps {
	children: React.ReactNode
}

const LayoutDashboard = ({ children }: ILayoutDashboardProps) => {
	return (
		<>
			<NavBarAdmin />
			<DrawerLeft>
				<MainContent>{children}</MainContent>
			</DrawerLeft>
		</>
	)
}

export default LayoutDashboard
