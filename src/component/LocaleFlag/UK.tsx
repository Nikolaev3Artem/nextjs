import Box from "@mui/material/Box"
import Image from "next/image"
import React from "react"

const Uk = () => {
	return (
		<Box display={"flex"} mr={1}>
			<Image height={14} width={24} src={"/uk.svg"} alt='flag' />
		</Box>
	)
}

export default Uk
