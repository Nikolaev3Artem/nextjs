import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/lt"
import "dayjs/locale/pt"
import "dayjs/locale/uk"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import * as React from "react"
import { useEffect, useState } from "react"

import { useAppSelector } from "../../../store/auth/redux"

export default function LocalizedDatePicker() {
	const { t } = useTranslation("main")

	const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
		dayjs()
	)
	const [open, setOpen] = useState<boolean>(false)
	const { locale } = useRouter()
	const active: boolean | undefined = useAppSelector(
		(state) => state.popular.active
	)

	useEffect(() => {
		if (active === true) {
			setTimeout(() => {
				setOpen(true)
			}, 500)
		}
	}, [active])
	const today = dayjs()
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
			<Box mx={2}>
				<DatePicker
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label={t("date_input")}
					minDate={today}
					autoFocus={true}
					value={datePickerValue}
					onChange={(newValue) => {
						setDatePickerValue(newValue)
					}}
					// @ts-ignore
					// slotProps={{
					// 	textField: {...params, onClick = {(e) => setOpen(true)}}
					// }}
					onViewChange={(params: object) => (
						<TextField {...params} onClick={(e) => setOpen(true)} />
					)}
				/>
			</Box>
		</LocalizationProvider>
	)
}
