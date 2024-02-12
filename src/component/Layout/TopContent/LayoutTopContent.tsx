import { StyledEngineProvider } from "@mui/material"
import Container from "@mui/material/Container"
import * as React from "react"

import Style from "./content.module.scss"

interface IContentProps {
	children: React.ReactNode
}

const LayoutTopContent = (props: IContentProps) => {
	return (
		<>
			{/*<StyledEngineProvider injectFirst>*/}
			<Container className={Style.content} maxWidth={false}>
				{props.children}
			</Container>
			{/*</StyledEngineProvider>*/}
		</>
	)
}
export default LayoutTopContent
