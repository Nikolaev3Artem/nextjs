import { Skeleton } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"

const color = grey[500]

interface ISkeleton {
	children?: React.ReactNode
}
const ModalSkeleton = ({ children }: ISkeleton) => {
	return (
		<Skeleton
			sx={{ backgroundColor: color, height: "100%" }}
			variant='rectangular'
		/>
	)
}

export default ModalSkeleton
