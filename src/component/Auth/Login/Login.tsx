import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled"
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled"
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled"
import TabsListUnstyled from "@mui/base/TabsListUnstyled"
import TabsUnstyled from "@mui/base/TabsUnstyled"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import EmailIcon from "@mui/icons-material/Email"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import TwitterIcon from "@mui/icons-material/Twitter"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Divider, Fade, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"
import Cookies from "js-cookie"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { SyntheticEvent, useEffect, useRef, useState } from "react"

import logo from "../../../../public/logobleck.svg"
import { IProfile } from "../../../interface/IUser"
import { useAppDispatch, useAppSelector } from "../../../store/auth/redux"
import { removToken } from "../../../store/auth/tokenSlice"
import {
	useGetTokenMutation,
	useGetUserQuery
} from "../../../store/auth/user.api"
import Style from "./login.module.scss"

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #333333;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  width: 100%;
  height: 30px;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;

  //&:hover {
  //  background-color: #ccc;
  //}
;
}

&:focus {
  color: #fff;
}


&.${tabUnstyledClasses.selected} {
  position: absolute;
  background-color: #fff;
  color: #0072E5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: all .2s ease-in-out;
  transition-property: width, height, left;
}

&.${buttonUnstyledClasses.disabled} {
  opacity: 0.5;
  cursor: not-allowed;
}
`

const TabsList = styled(TabsListUnstyled)(
	({ theme }) => `
    
  background-color: #e5e5e5e5;
  width: 100%;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
)
const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
	font-family: Inter, -apple-system, sans-serif, sans-serif;
	font-size: 0.875rem;
`

interface State {
	email: string
	password: string
	showPassword: boolean
}

interface IAuth {
	access_token: string
	id_token: string
}

const BASE_URL = "http://127.0.0.1:8000/api/customer/"

export default function Login() {
	// const { data: session } = useSession()

	// useEffect(() => {
	//     const getTokenFromServer = async () => {
	//         // TODO: handle error when the access token expires
	//         const response = await axios.post(
	//             // DRF backend endpoint, api/social/google/ for example
	//             // this returns accessToken and refresh_token in the form of HTTPOnly cookies
	//             BASE_URL,
	//
	//             {}
	//         )
	//     }
	//     if (session) {
	//         getTokenFromServer()
	//     }
	// }, [session])

	const router = useRouter()
	const [values, setValues] = React.useState<State>({
		email: "",
		password: "",
		showPassword: false
	})

	const [user, setUser] = useState<IProfile[]>([])
	const [phone, setPhone] = useState("")

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword
		})
	}

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const [getToken, {}] = useGetTokenMutation()

	let val = {
		email: values.email,
		password: values.password
	}

	const dispatch = useAppDispatch()
	const SignIn = async (event: SyntheticEvent) => {
		event.preventDefault()
		Cookies.remove("access")
		const { data: token }: any = await getToken(val)
		// console.log(token)

		if (token) {
			// dispatch(setToken(token))
			Cookies.set("access", token.access)
			// localStorage.setItem("access", token.access)
			// localStorage.setItem("refresh", token.refresh)
			await router.push("/")
		}

		// try {
		//     const response = await axios.post<IToken>(
		//         "http://127.0.0.1:8000/auth/jwt/create/",
		//         {
		//             headers: {
		//                 "TopContent-Type": "application/json",
		//             },
		//             email: values.email,
		//             password: values.password,
		//         }
		//     )
		//     dispatch(setToken(response.data))
		//     // dispatch(setTokenRefresh(response.data.refresh))
		//     localStorage.setItem("access", response.data.access)
		//     localStorage.setItem("refresh", response.data.refresh)
		//     dispatch(userFetching())
		//     const {data} = await axios.get<IProfile[]>(
		//         "http://127.0.0.1:8000/api/customer/",
		//         {
		//             headers: {
		//                 "TopContent-Type": "application/json",
		//                 Authorization: "Bearer " + response.data.access,
		//             },
		//         }
		//     )
		//     dispatch(userFetchingSuccsess(data))
		//
		//     await router.push("/")
		// } catch (error) {
		//     if (axios.isAxiosError(error)) {
		//         dispatch(userFetchingErorr(error.message))
		//         console.log("error message: ", error.message)
		//         // 👇️ error: AxiosError<any, any>
		//         return error.message
		//     } else {
		//         console.log("unexpected error: ", error)
		//         return "An unexpected error occurred"
		//     }
		// }
	}

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value)
	}

	const SignInPhone = (event: any) => {
		event.preventDefault()
		console.log(phone)
	}
	const { t } = useTranslation(["login", "header"])
	return (
		<Fade in>
			<div className={Style.login}>
				<Box component='form' noValidate autoComplete='off'>
					<h2>{t("sign_in", { ns: "header" })}</h2>
					<TabsUnstyled defaultValue={0}>
						<TabPanel value={0}>
							<Box
								sx={{
									width: {
										sm: 360,
										md: 420
									}
								}}
							>
								<div className={Style.login__content}>
									<div className={Style.service}>
										<Box
											sx={{
												alignItems: "center",
												justifyContent: "center",
												display: "flex",
												flexDirection: "column"
											}}
										>
											<Link href={"/"}>
												<Image
													width={100}
													height={100}
													src={logo}
													alt={"logo"}
												/>
											</Link>
											{/*<p>{t("service_help")}</p>*/}
											{/*<Stack direction="row" alignItems="center" spacing={2}>*/}
											{/*  <IconButton*/}
											{/*    style={{ color: "#dc4e41" }}*/}
											{/*    component="label"*/}
											{/*  >*/}
											{/*    <GoogleIcon />*/}
											{/*  </IconButton>*/}
											{/*  <IconButton*/}
											{/*    style={{ color: "#3b5998" }}*/}
											{/*    component="label"*/}
											{/*  >*/}
											{/*    <FacebookIcon />*/}
											{/*  </IconButton>*/}
											{/*  <IconButton*/}
											{/*    style={{ color: "#55acee" }}*/}
											{/*    component="label"*/}
											{/*  >*/}
											{/*    <TwitterIcon />*/}
											{/*  </IconButton>*/}
											{/*</Stack>*/}
										</Box>
									</div>
									{/*<TabsList className={Style.tab__content}>*/}
									{/*  <Tab className={Style.tab}>*/}
									{/*    <EmailIcon sx={{ mx: 1 }} fontSize={"small"} />*/}
									{/*    {t("email")}*/}
									{/*  </Tab>*/}
									{/*  <Tab className={Style.tab}>*/}
									{/*    <PhoneIphoneIcon sx={{ mx: 1 }} fontSize={"small"} />*/}
									{/*    {t("phone")}*/}
									{/*  </Tab>*/}
									{/*</TabsList>*/}
									<Box
										sx={{
											justifyContent: "flex-start",
											display: "flex"
										}}
									>
										<Typography
											sx={{ color: grey[700] }}
											my={2}
											variant='body1'
										>
											{t("login_email")}
										</Typography>
									</Box>
									<TextField
										// size={"small"}
										sx={{ my: 1 }}
										value={values.email}
										onChange={handleChange("email")}
										label={t("email")}
										variant='outlined'
									/>

									<FormControl sx={{ my: 1, width: "100%" }} variant='outlined'>
										<InputLabel htmlFor='outlined-adornment-password'>
											{t("pass")}
										</InputLabel>
										<OutlinedInput
											// size={"small"}
											id='outlined-adornment-password'
											type={values.showPassword ? "text" : "password"}
											value={values.password}
											onChange={handleChange("password")}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														{values.showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
											label='Пароль'
										/>
									</FormControl>
									<Button
										color={"secondary"}
										sx={{ my: 1, mb: 1, height: "50px", textTransform: "none" }}
										size='large'
										variant='contained'
										onClick={SignIn}
									>
										{t("sign_in", { ns: "header" })}
									</Button>
									<Box className={Style.login__forgot}>
										<Link href='#'>{t("forgot_pass")}</Link>
									</Box>
									<Divider />
									<div className={Style.login__registration}>
										<Link href='/auth/registration'>{t("reg_link")}</Link>
									</div>
								</div>
							</Box>
						</TabPanel>
						<TabPanel value={1}>
							<Box
								sx={{
									width: {
										sm: 360,
										md: 420
									}
								}}
							>
								<div className={Style.login__content}>
									<div>
										<Box
											sx={{
												alignItems: "center",
												justifyContent: "center",
												display: "flex",
												flexDirection: "column"
											}}
										>
											<DirectionsBusIcon color={"action"} fontSize={"large"} />
											<p>За допомогою сервісу</p>
											<Stack direction='row' alignItems='center' spacing={2}>
												<IconButton
													style={{ color: "#dc4e41" }}
													component='label'
												>
													<GoogleIcon />
												</IconButton>
												<IconButton
													style={{ color: "#3b5998" }}
													component='label'
												>
													<FacebookIcon />
												</IconButton>
												<IconButton
													style={{ color: "#55acee" }}
													component='label'
												>
													<TwitterIcon />
												</IconButton>
											</Stack>
										</Box>
									</div>
									<TabsList className={Style.tab__content}>
										<Tab className={Style.tab}>
											<EmailIcon sx={{ mx: 1 }} fontSize={"small"} />
											E-mail
										</Tab>
										<Tab className={Style.tab}>
											<PhoneIphoneIcon sx={{ mx: 1 }} fontSize={"small"} />
											Телефон
										</Tab>
									</TabsList>

									<Box
										sx={{
											justifyContent: "center",
											display: "flex"
										}}
									>
										<h3>Зареєструйтеся за допомогою номеру телефона</h3>
									</Box>
									<FormControl sx={{ my: 1, width: "100%" }}>
										<TextField
											value={phone}
											onChange={handleChangePhone}
											label='Телефон'
											variant='outlined'
										></TextField>
									</FormControl>

									<Button
										sx={{ my: 1, mb: 2, height: "50px", textTransform: "none" }}
										color='primary'
										size='large'
										variant='contained'
										onClick={SignInPhone}
									>
										{t("sign_in", { ns: "header" })}
									</Button>

									<Divider />

									<div className={Style.login__registration}>
										<Link href='/auth/registration'>
											Немає облікового запису? Зареєструйтесь
										</Link>
									</div>
								</div>
							</Box>
						</TabPanel>
					</TabsUnstyled>
				</Box>
			</div>
		</Fade>
	)
}
