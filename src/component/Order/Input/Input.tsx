import { Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import * as React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../store/auth/redux"
import { removePopular, setPopular } from "../../../store/popular/popularSlice"

export default function ComboBox() {
	const { t } = useTranslation("main")

	const [value1, setValue1] = useState<any>("")
	const [value2, setValue2] = useState<any>("")
	const ref1 = useRef(null)

	const val1: string = useAppSelector((state) => state.popular.val1)
	const val2: string = useAppSelector((state) => state.popular.val2)
	const active: boolean | undefined = useAppSelector(
		(state) => state.popular.active
	)

	const router = useRouter()
	useEffect(() => {
		if (active === true) {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			})
			setValue1(val1)
			setValue2(val2)
		}
	}, [active])

	return (
		<Box>
			<Stack direction='row' gap={2}>
				<Autocomplete
					value={value1}
					freeSolo={true}
					disablePortal
					fullWidth={true}
					options={City}
					renderInput={(params) => <TextField {...params} label={t("from")} />}
					onInputChange={(event, newInputValue, reason) => {
						setValue1(newInputValue)
					}}
				/>
				<Autocomplete
					value={value2}
					freeSolo={true}
					fullWidth={true}
					disablePortal
					options={City}
					renderInput={(params) => <TextField {...params} label={t("to")} />}
					onInputChange={(event, newInputValue) => {
						setValue2(newInputValue)
					}}
				/>
			</Stack>
		</Box>
	)
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const City = [
	{ label: "Львів" },
	{ label: "Київ" },
	{ label: "Івано-Франківськ" },
	{ label: "Тернопіль" },
	{ label: "Ужгород" },
	{ label: "Закарпаття" },
	{ label: "Мукачево" }
]
