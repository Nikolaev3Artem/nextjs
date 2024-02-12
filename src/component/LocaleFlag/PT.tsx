import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"

const Pt = () => {
	return (
		<Box display={"flex"} mr={1}>
			<Image height={14} width={24} src={"/pt.svg"} alt='flag' />
		</Box>
	)
}

export default Pt
