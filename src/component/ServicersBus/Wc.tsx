import Typography from "@mui/material/Typography"
import React from "react"

const Wc = () => {
	return (
		<Typography
			component={"span"}
			sx={{
				fontFamily: "Inter",
				fontStyle: "normal",
				textTransform: "none",
				fontWeight: 600,
				fontSize: "14px",
				lineHeight: "150%"
			}}
		>
			WC
		</Typography>
	)
}

export default Wc
