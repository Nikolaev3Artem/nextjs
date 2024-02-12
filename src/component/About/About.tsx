import { Fade, useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import React from "react"

import AboutSvg from "../../../public/about.svg"
import { IEditorText } from "../../interface/IEditorText"
import theme from "../../theme"
import Style from "./About.module.scss"

const About = ({ text, text2 }: IEditorText) => {
	const md = useMediaQuery(theme.breakpoints.down("md"))

	return (
		<div>
			<Container className={Style.content} maxWidth={"lg"}>
				<Grid
					container
					direction={"column"}
					justifyContent={"flex-start"}
					alignItems='flex-start'
					width={"100%"}
				>
					<Grid item>
						{/*<Box className={Style.content__title}>*/}
						{/*	<Typography*/}
						{/*		component={"h4"}*/}
						{/*		className={Style.about__title}*/}
						{/*		variant={"h4"}*/}
						{/*		dangerouslySetInnerHTML={{ __html: title }}*/}
						{/*	/>*/}
						{/*</Box>*/}
					</Grid>
					<Grid item display={"flex"} width={"100%"}>
						<Grid container direction={"row"} width={"100%"}>
							<Grid item md={12} lg={7} xl={8}>
								<Box
									// sx={{ wordBreak: "break-all" }}
									className={Style.about_text_content}
									fontSize={14}
									color={"darkslategray"}
									dangerouslySetInnerHTML={{
										__html: text || ""
									}}
								/>
							</Grid>
							<Grid item md={12} lg={5} xl={4}>
								<Box display={"flex"} justifyContent={"center"} px={2}>
									<Fade in={true} timeout={2000}>
										<Box>
											<Image
												src={AboutSvg}
												alt={"about"}
												width={350}
												height={328}
												priority={true}
											/>
										</Box>
									</Fade>
								</Box>
							</Grid>
							<Box
								// sx={{ wordBreak: "break-all" }}
								className={Style.about_text_content}
								fontSize={14}
								color={"darkslategray"}
								mt={2}
								dangerouslySetInnerHTML={{
									__html: text2 || ""
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default About
