import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"

const LT = () => {
	return (
		<Box display={"flex"} mr={1}>
			<Image height={14} width={24} src={"/lt.svg"} alt='flag' />
		</Box>
	)
}

export default LT
