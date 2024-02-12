import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import React from "react"

import { useAppSelector } from "../../../store/auth/redux"

interface IAccordionProps {
	children: React.ReactNode
}

const CustomAccordion = ({ children }: IAccordionProps) => {
	const open = useAppSelector((state) => state.accordion.open)

	return (
		<Accordion
			expanded={open}
			elevation={0}
			sx={{ cursor: "default!important" }}
		>
			<AccordionSummary
				sx={{ cursor: "default!important" }}
				aria-controls='panel1a-content'
				id='panel1a-header'
			></AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	)
}

export default CustomAccordion
