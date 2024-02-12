import { Fade } from "@mui/material"
import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"
import React from "react"

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: "4px"
}
interface IModalProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
}

const CardInfoModal = ({ isOpen, onClose, children }: IModalProps) => {
	// const xlUp = useMediaQuery(theme.breakpoints.up("xl"))
	// const xl = useMediaQuery(theme.breakpoints.down("xl"))
	// const lg = useMediaQuery(theme.breakpoints.down("lg"))
	// const md = useMediaQuery(theme.breakpoints.down("md"))
	// const sm = useMediaQuery(theme.breakpoints.down("sm"))
	//
	// const [breakpoint, setBreakpoint] = useState<string>("")
	//
	// useEffect(() => {
	// 	if (xlUp) setBreakpoint("md")
	// 	if (xl) setBreakpoint("md")
	// 	if (lg) setBreakpoint("sm")
	// 	if (md) setBreakpoint("xs")
	// }, [breakpoint, isOpen])

	return (
		<Modal
			style={{ margin: 16 }}
			open={isOpen}
			onClose={onClose}
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
		>
			<Fade in={isOpen}>
				<Container maxWidth={"sm"} disableGutters sx={style}>
					{children}
				</Container>
			</Fade>
		</Modal>
	)
}

export default CardInfoModal
