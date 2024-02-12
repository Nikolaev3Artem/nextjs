import { Box, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import React, { useMemo } from "react"

import { IRent } from "../../../interface/IRent"
import Ac from "../../ServicersBus/Ac"
import Display from "../../ServicersBus/Display"
import Music from "../../ServicersBus/Music"
import Plug from "../../ServicersBus/Plug"
import Usb from "../../ServicersBus/Usb"
import Wc from "../../ServicersBus/Wc"
import Wifi from "../../ServicersBus/Wifi"

const color = grey[700]
const colorIcon = grey[800]
interface IServiceBus {
	id: number
	name: string
	component: JSX.Element
}

interface IService {
	id: number
	name: string
}

const serviceBus: IServiceBus[] = [
	{ id: 1, name: "wifi", component: <Wifi /> },
	{ id: 2, name: "wc", component: <Wc /> },
	{ id: 3, name: "ac", component: <Ac /> },
	{ id: 4, name: "plug", component: <Plug /> },
	{ id: 5, name: "usb", component: <Usb /> },
	{ id: 6, name: "display", component: <Display /> },
	{ id: 7, name: "music", component: <Music /> }
]
const BusService = ({ busIdService }: IRent) => {
	const service = function (
		busIdService: IService[],
		serviceBus: IServiceBus[]
	) {
		let dataId: number[] = []
		busIdService.forEach((id) => dataId.push(id.id))
		return serviceBus.filter((item) => dataId.includes(item.id))
	}

	const data = useMemo(() => {
		return service(busIdService, serviceBus)
	}, [busIdService])

	return (
		<>
			{busIdService?.length ? (
				<Stack
					direction={"row"}
					spacing={0.5}
					justifyContent={"flex-start"}
					alignItems={"center"}
				>
					{data.map((item) => (
						<Box
							sx={{
								color: colorIcon
							}}
							display={"flex"}
							key={item.id}
						>
							{item.component}
						</Box>
					))}
				</Stack>
			) : (
				<Typography
					sx={{
						fontFamily: "Inter",
						fontStyle: "normal",
						textTransform: "none",
						fontWeight: 400,
						fontSize: "14px",
						lineHeight: "150%"
					}}
					variant='h6'
					color={color}
				>
					none
				</Typography>
			)}
		</>
	)
}

export default BusService
