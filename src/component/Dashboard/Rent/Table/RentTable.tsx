import {
	Paper,
	Stack,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow
} from "@mui/material"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { MdOutlineCancel } from "react-icons/md"

import { IRent } from "../../../../interface/IRent"
import BusService from "../../../Rent/BusService/BusService"
import Style from "./rentform.module.scss"
import axios from "axios"
import { getCookie } from "cookies-next"
import { enqueueSnackbar } from "notistack"

const colorIcon = grey[700]
const colorHeader = grey[800]

export interface IRentProps {
	rents: IRent[]
}

const RentTable = ({ rents }: IRentProps) => {
	const BASE_URL: string | undefined = process.env.REACT_APP_URL
	const [dense, setDense] = React.useState(false)
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(15)

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}
	const rout = useRouter()

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 15))
		setPage(0)
	}

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked)
	}

	const handleClick = (id: any): any => {
		rout.push(`rent/${id}`)
	}
	const handleClickDelete = async (id: any) => {
		try {
			const response = await fetch(
				`${BASE_URL}${rout.locale}/api/rent/admin/delete/${id}/`,
				{
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + getCookie("access"),
						"Content-Type":
							"multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
					}
				}
			)
			if (response.status === 204) {
				enqueueSnackbar("Карточка видалена", { variant: "success" })
				rout.push("/dashboard/rent/")
			}
		} catch (error) {
			console.error(error)
			enqueueSnackbar("Помилка видалення", { variant: "error" })
		}
	}
	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer
				className={Style.table_container}
				elevation={0}
				component={Paper}
			>
				<Table
					sx={{ minWidth: 650 }}
					size={dense ? "small" : "medium"}
					aria-label='simple table'
				>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									py: 2,
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
							>
								ID#
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Назва
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Фото
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Зручності
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Місця
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Поверхи
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							>
								Статус
							</TableCell>
							<TableCell
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "14px",
									lineHeight: "150%",
									color: colorHeader
								}}
								align='left'
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rents
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => (
								<TableRow
									hover
									tabIndex={-1}
									key={item.id}
									// sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{item.id}
									</TableCell>
									<TableCell component='th' scope='row'>
										{item.name}
									</TableCell>
									<TableCell sx={{ py: 0 }} align='left'>
										<Image
											style={{ borderRadius: 4, display: "flex" }}
											src={item.poster || ""}
											width={dense ? 50 : 60}
											height={dense ? 28 : 40}
											alt={"alt"}
										/>
									</TableCell>
									<TableCell align='left'>
										<BusService busIdService={item.busIdService} />
									</TableCell>
									<TableCell align='left'>{item.places}</TableCell>
									<TableCell align='left'>{item.floor}</TableCell>
									<TableCell align='left'>
										{item.is_active ? (
											<AiOutlineCheckCircle size={16} color={"green"} />
										) : (
											<MdOutlineCancel size={16} color={"red"} />
										)}
									</TableCell>
									<TableCell align='right'>
										<Stack
											justifyContent={"flex-end"}
											direction={"row"}
											spacing={2}
											width={"100%"}
										>
											<IconButton
												onClick={() => {
													handleClick(item.id)
												}}
												sx={{ color: colorIcon, fontSize: 16 }}
												size={"small"}
											>
												<FiEdit />
											</IconButton>
											<IconButton
												onClick={() => {
													handleClickDelete(item.id)
												}}
												sx={{ color: colorIcon, fontSize: 16 }}
												size={"small"}
											>
												<FiTrash2 />
											</IconButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<TableFooter component={"div"} sx={{ width: "100%", display: "flex" }}>
					<Stack
						sx={{ width: "100%" }}
						display={"flex"}
						direction={"row"}
						alignItems={"center"}
						justifyContent={"flex-end"}
					>
						<Box
							display={"flex"}
							alignItems={"center"}
							justifyContent={"flex-end"}
						>
							<Typography
								mr={1}
								sx={{
									fontFamily: "Inter",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "14px",
									lineHeight: "150%"
								}}
							>
								Зменшити:
							</Typography>
							<Switch onChange={handleChangeDense} />
						</Box>
						<TablePagination
							rowsPerPageOptions={[15, 25, 50, { label: "All", value: -1 }]}
							component='div'
							count={rents.length}
							rowsPerPage={rowsPerPage}
							labelRowsPerPage={"Рядків на сторінці"}
							SelectProps={{
								inputProps: {
									"aria-label": "rows per page"
								},
								native: false
							}}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Stack>
				</TableFooter>
			</TableContainer>
		</Paper>
	)
}

export default RentTable
