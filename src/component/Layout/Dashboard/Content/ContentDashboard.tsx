import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTranslation } from "next-i18next"
import React, { useEffect, useState } from "react"

import Style from "./contentdashboard.module.scss"
import Button from "@mui/material/Button"
import { BiArrowBack } from "react-icons/bi"
import { useRoute } from "@react-buddy/ide-toolbox/dist/routing/routing"
import { useRouter } from "next/router"
import { Stack } from "@mui/material"
import { IoIosArrowBack } from "react-icons/io"

interface IContentDashboardProps {
	children: React.ReactNode
	title: string
}

const ContentDashboard = ({ title, children }: IContentDashboardProps) => {
	const [path, setPath] = useState("")
	const { t } = useTranslation("dashboard")

	const rout = useRouter()
	const handleBack = () => {
		rout.back()
	}
	useEffect(() => {
		setPath(rout.pathname)
	}, [])

	return (
		<>
			<Box className={Style.content}>
				<Stack
					mb={2}
					direction={"row"}
					spacing={2}
					justifyContent={"center"}
					alignItems={"center"}
					display={"flex"}
				>
					{path !== "/dashboard/rent" ? (
						<Box>
							<Button
								sx={{
									// height: 27,
									color: "#737373"
								}}
								startIcon={<IoIosArrowBack />}
								onClick={handleBack}
							>
								<Typography
									sx={{
										fontFamily: "Inter",
										fontStyle: "normal",
										fontWeight: "500",
										fontSize: "16px",
										lineHeight: "140%",
										color: "#737373",
										textTransform: "none"
									}}
								>
									Назад
								</Typography>
							</Button>
						</Box>
					) : (
						<></>
					)}
					<Typography
						display={"flex"}
						sx={{
							fontFamily: "Inter",
							fontStyle: "normal",
							fontWeight: "600",
							fontSize: "20px",
							lineHeight: "140%",
							color: "#404040"
						}}
						mb={2}
					>
						{t(`${title}`)}
					</Typography>
				</Stack>

				{children}
			</Box>
		</>
	)
}

export default ContentDashboard
