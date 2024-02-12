import React from "react"

import Footer from "../../Footer/Footer"
import InfoBuy from "../../InfoBuy/InfoBuy"
import Navbar from "../../Navbar/Navbar"
import Popular from "../../Popular/Popular"

interface IDefaultProps {
	children: React.ReactNode
}

const LayoutDefault = ({ children }: IDefaultProps) => {
	return (
		<>
			<Navbar />
			{children}
			<InfoBuy />
			<Popular />
			<Footer />
		</>
	)
}

export default LayoutDefault
