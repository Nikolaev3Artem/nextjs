import React, { useContext } from "react"
import Box from "@mui/material/Box"
import theme from "../../../../theme"
import Style from "../homedashboard.module.scss"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Image from "next/image"
import { grey } from "@mui/material/colors"
import { useAppDispatch, useAppSelector } from "../../../../store/auth/redux"
import { setCloseModal } from "../../../../store/admin/home/homeModalSlice"
import { IBanner } from "../../../../interface/IBanner"

interface IBannerProps {
	res: IBanner[]
	open: boolean
	children?: React.ReactNode
	onClose?: () => void
}

const color_title = grey[800]
const Modal = ({ res, open, children }: IBannerProps) => {
	const dispatch = useAppDispatch()

	// const open = useAppSelector((state) => state.modal.open)
	const handleClose = () => dispatch(setCloseModal())
	return <></>
}

export default Modal
