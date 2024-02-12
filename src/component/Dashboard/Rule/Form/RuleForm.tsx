import { CircularProgress, Fade, Skeleton, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { grey } from "@mui/material/colors"
import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { BiSave } from "react-icons/bi"

import { IEditorText } from "../../../../interface/IEditorText"
import { setAccordionClose } from "../../../../store/admin/accordion/accordionOpenSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/auth/redux"
import theme from "../../../../theme"
import { onSubmitForm } from "../../../../utils/onSubmit"
import Rule from "../../../Rule/Rule"
import TextEditor from "../../../TextEditor/TextEditor"
import CustomAccordion from "../../Accordion/CustomAccordion"
import CustomButtonAccordion from "../../Accordion/CustomButtonAccordion"
import Style from "./ruleform.module.scss"

const color_title = grey[800]
const RuleForm = () => {
	const BASE_URL: string | undefined = process.env.REACT_APP_URL
	const [res, setRes] = useState<IEditorText[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const rout = "rule"
	const lang = useAppSelector((state) => state.locale.lang)
	const data = useAppSelector((state) => state.editor.data)
	const dataTwo = useAppSelector((state) => state.editor.dataTwo)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setAccordionClose())
	}, [])
	// onSubmitForm({ res, lang, data, dataTwo })
	// const onSubmit = async () => {
	// 	if (!res) return
	//
	// 	setIsLoading(true)
	//
	// 	const formData = new FormData()
	// 	formData.append("text", data || "")
	// 	formData.append("text2", dataTwo || "")
	//
	// 	const response = await axios.put(
	// 		`http://127.0.0.1:8000/${lang}/api/about/update/${res[0].id}`,
	// 		formData,
	// 		{
	// 			headers: {
	// 				Authorization: "Bearer " + getCookie("access"),
	// 				"Content-Type":
	// 					"multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
	// 			}
	// 		}
	// 	)
	// 	// reset()
	// 	await getAbout()
	// 	if (response.status === 200) {
	// 		setTimeout(() => {
	// 			setIsLoading(false)
	// 			enqueueSnackbar("Ваші зміни збережені", { variant: "success" })
	// 		}, 1500)
	// 	}
	// }

	const getData = useCallback(async () => {
		try {
			const { data } = await axios.get<IEditorText[]>(
				`${BASE_URL}${lang}/api/${rout}`
			)
			setRes(data)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.message)
				return error.message
			} else {
				console.log("unexpected error: ", error)
				return "An unexpected error occurred"
			}
		}
	}, [])

	useEffect(() => {
		getData().catch(console.error)
	}, [getData])

	return (
		<>
			<Box
				className={Style.home_form}
				sx={{ backgroundColor: theme.palette.background.default }}
			>
				<Container
					maxWidth={false}
					className={Style.home_form_content}
					disableGutters
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							height: "100%"
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "100%",
								height: "100%"
							}}
						>
							<Fade in={true} timeout={1000}>
								{res && res[0] ? (
									<>
										<Grid container direction={"column"} mt={2}>
											<Grid item>
												<Box className={Style.text_editor_container}>
													<Grid container direction={"row"}>
														<Grid
															item
															width={"100%"}
															mb={4}
															pr={{ md: 0, xl: 2 }}
															xl={6}
														>
															<TextEditor
																data={1}
																titleOne={"Текст першого блоку"}
																res={res}
															/>
														</Grid>
														<Grid
															item
															width={"100%"}
															mb={4}
															xl={6}
															pl={{ md: 0, xl: 2 }}
														>
															<TextEditor
																data={2}
																titleTwo={"Текст другого блоку"}
																res={res}
															/>
														</Grid>
													</Grid>
												</Box>
												<Box display={"flex"} justifyContent={"flex-end"}>
													<Stack spacing={2} direction={"row"}>
														<CustomButtonAccordion name={"Переглянути"} />
														<Button
															type={"submit"}
															sx={{
																fontFamily: "Inter",
																fontStyle: "normal",
																textTransform: "none",
																fontWeight: 300,
																fontSize: "16px",
																lineHeight: "150%",
																padding: "8px 16px",
																gap: "4px",
																height: "40px"
															}}
															onClick={() =>
																onSubmitForm({ res, rout, lang, data, dataTwo })
															}
															startIcon={<BiSave />}
															color={"secondary"}
															variant={"contained"}
														>
															Зберегти
														</Button>
													</Stack>
												</Box>
											</Grid>

											<Grid item>
												{!isLoading ? (
													<CustomAccordion>
														<Rule
															text={data || res[0]?.text}
															text2={dataTwo || res[0]?.text2}
														/>
													</CustomAccordion>
												) : (
													<Box className={Style.about_form_content_skeleton}>
														<Skeleton
															variant='rectangular'
															animation={"wave"}
															width={"100%"}
															height={400}
														/>
													</Box>
												)}
												{!isLoading ? null : (
													<Box className={Style.about_form_content}>
														<Box
															className={
																Style.about_form_content_position_circular
															}
														>
															<Box
																className={Style.about_form_content_circular}
															>
																<CircularProgress color={"secondary"} />
															</Box>
														</Box>
													</Box>
												)}
											</Grid>
										</Grid>
									</>
								) : (
									<Skeleton
										variant='rectangular'
										animation={"wave"}
										width={"100%"}
										height={400}
									/>
								)}
							</Fade>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default RuleForm
