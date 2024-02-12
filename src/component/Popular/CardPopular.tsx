import { Card, CardContent } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import { useRouter } from "next/router"
import React, {
	MouseEvent,
	MouseEventHandler,
	useEffect,
	useRef,
	useState
} from "react"

import popular_svg from "../../../public/popular_svg.svg"
import { useAppDispatch } from "../../store/auth/redux"
import { removePopular, setPopular } from "../../store/popular/popularSlice"
import Style from "./Card.module.scss"

interface IProps {
	name1: string
	name2: string
}

const CardPopular = (props: IProps) => {
	const [val1, setVal1] = useState<string>("")
	const [val2, setVal2] = useState<string>("")
	const [active, setActive] = useState<boolean>(true)
	const router = useRouter()
	useEffect(() => {
		setVal1(props.name1)
		setVal2(props.name2)
	})
	const dispatch = useAppDispatch()
	const PopularPush = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		if (router.asPath !== "/") {
			router.push("/").then(() => {
				dispatch(setPopular({ val1, val2, active }))
				setTimeout(() => {
					dispatch(removePopular())
				}, 1000)
			})
		} else {
			dispatch(setPopular({ val1, val2, active }))
			setTimeout(() => {
				dispatch(removePopular())
			}, 1000)
		}
	}
	return (
		<Box>
			<Card
				component={"div"}
				onClick={PopularPush}
				className={Style.hover}
				elevation={0}
			>
				<CardContent className={Style.content}>
					<Image src={popular_svg} alt={"icon"} />
					<Box className={Style.content_text}>
						<Typography component={"span"} className={Style.text}>
							{val1}
						</Typography>
						<Typography component={"span"} className={Style.text}>
							{val2}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Box>
	)
}

export default CardPopular
