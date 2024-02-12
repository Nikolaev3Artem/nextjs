import { Fade, Slide } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import * as React from "react"

import Style from "./order.module.scss"

interface IContentProps {
	children: React.ReactNode
}

const LayoutContent = (props: IContentProps) => {
	const containerRef = React.useRef(null)
	return (
		<React.Fragment>
			<CssBaseline />
			{/*<StyledEngineProvider injectFirst>*/}
			<Container maxWidth={"xl"}>
				<Grid container>
					<Grid item lg={1} xl={1}></Grid>
					<Grid item sm={12} md={12} lg={10} xl={10}>
						<Box ref={containerRef}>
							<Fade in={true} timeout={1000}>
								<Box px={4} py={4} className={Style.content}>
									{props.children}
								</Box>
							</Fade>
						</Box>
					</Grid>
					<Grid item lg={1} xl={1}></Grid>
				</Grid>
			</Container>
			{/*</StyledEngineProvider>*/}
		</React.Fragment>
	)
}

export default LayoutContent
