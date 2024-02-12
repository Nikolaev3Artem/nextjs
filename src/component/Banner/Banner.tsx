import { Fade, Slide, useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import cn from "clsx"
import Image from "next/image"
import * as React from "react"

import { IBanner } from "../../interface/IBanner"
import theme from "../../theme"
import Style from "./Banner.module.scss"

// console.log(theme.breakpoints.down("xl"))
const Banner = (props: IBanner) => {
	const containerRef = React.useRef(null)
	const lg = useMediaQuery(theme.breakpoints.down("lg"))
	const md = useMediaQuery(theme.breakpoints.down("md"))

	return (
		<Container className={Style.banner} maxWidth={false}>
			<Fade timeout={1000} in={true}>
				<Box className={Style.wrapper_img}>
					<Image
						src={props.img as string}
						alt={props.alt as string}
						style={{
							objectFit: "cover"
						}}
						fill
						priority={true}
						quality={100}
					/>
				</Box>
			</Fade>
			<Box className={Style.content}>
				<Container maxWidth={"xl"}>
					<Box className={Style.content__title}>
						<Grid container>
							<Grid item md={1} lg={1} xl={1}></Grid>
							<Grid item sm={12} md={10} lg={10} xl={10}>
								<Box ref={containerRef} className={Style.transition__banner}>
									<Slide
										container={containerRef.current}
										timeout={1500}
										direction='up'
										in={true}
									>
										<Box>
											<Fade in={true} timeout={3000}>
												<Box sx={{ display: "flex", flexDirection: "column" }}>
													<Typography
														component={"h1"}
														className={cn(
															lg ? Style.fz28 : Style.fz40,
															md ? Style.mw80 : Style.mw70,
															Style.title
														)}
														variant='h1'
													>
														{props.h1}
													</Typography>
													<Typography
														fontSize={14}
														variant={"subtitle2"}
														className={Style.subtitle}
													>
														{props.description}
													</Typography>
												</Box>
											</Fade>
										</Box>
									</Slide>
								</Box>
							</Grid>
							<Grid item md={1} lg={1} xl={1}></Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</Container>
	)
}

export default Banner
