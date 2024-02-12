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
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useState } from "react"

import logo from "../../../../public/logobleck.svg"
import { useCreateUserMutation } from "../../../store/auth/user.api"
import Style from "./signup.module.scss"

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
  transition: all ease-in-out .2s;

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
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
`

interface State {
	email: string
	password: string
	name: string
	showPassword: boolean
}

export default function Signup() {
	const [data, setData] = React.useState<State>({
		email: "",
		password: "",
		name: "",
		showPassword: false
	})
	const [phone, setPhone] = useState("")

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setData({ ...data, [prop]: event.target.value })
		}
	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value)
	}

	const handleClickShowPassword = () => {
		setData({
			...data,
			showPassword: !data.showPassword
		})
	}

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}
	const [createUser, {}] = useCreateUserMutation()
	let formData = {
		email: data.email,
		password: data.password
	}
	const signup = async (event: any) => {
		event.preventDefault()
		await createUser(formData)
	}

	// const signup = async (event: any) => {
	//     event.preventDefault()
	//     const res = await axios.post('http://127.0.0.1:8000/auth/users/', {
	//         headers: {
	//             'TopContent-Type': 'application/json'
	//         },
	//         "email": data.email,
	//         "password": data.password
	//     })
	//     console.log(res.data)
	// }
	const SignInPhone = (event: any) => {
		event.preventDefault()
		console.log(phone)
	}

	const { t } = useTranslation(["registration", "header"])

	return (
		<Fade in>
			<div className={Style.signup}>
				<Box component='form' noValidate autoComplete='off'>
					<h2>{t("registration", { ns: "header" })}</h2>
					<TabsUnstyled defaultValue={0}>
						<TabPanel value={0}>
							<Box
								sx={{
									width: {
										sm: 360,
										md: 420
									}
								}}
								className={Style.signup__content}
							>
								<div className={Style.signup__service}>
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
												alt={"Логотип"}
											/>
										</Link>
										{/*<p>За допомогою сервісу</p>*/}
										{/*<Stack direction="row" alignItems="center" spacing={2}>*/}
										{/*  <IconButton style={{ color: "#dc4e41" }} component="label">*/}
										{/*    <GoogleIcon />*/}
										{/*  </IconButton>*/}
										{/*  <IconButton style={{ color: "#3b5998" }} component="label">*/}
										{/*    <FacebookIcon />*/}
										{/*  </IconButton>*/}
										{/*  <IconButton style={{ color: "#55acee" }} component="label">*/}
										{/*    <TwitterIcon />*/}
										{/*  </IconButton>*/}
										{/*</Stack>*/}
									</Box>
								</div>
								{/*<TabsList className={Style.tab__content}>*/}
								{/*  <Tab className={Style.tab}>*/}
								{/*    <EmailIcon sx={{ mx: 1 }} fontSize={"small"} />*/}
								{/*    E-mail*/}
								{/*  </Tab>*/}
								{/*  <Tab className={Style.tab}>*/}
								{/*    <PhoneIphoneIcon sx={{ mx: 1 }} fontSize={"small"} />*/}
								{/*    Телефон*/}
								{/*  </Tab>*/}
								{/*</TabsList>*/}
								<Box
									sx={{
										justifyContent: "flex-start",
										display: "flex"
									}}
								>
									<Typography sx={{ color: grey[700] }} my={2} variant='body1'>
										{t("reg_email")}
									</Typography>
								</Box>
								<FormControl sx={{ my: 1, width: "100%" }}>
									<TextField
										value={data.email}
										onChange={handleChange("email")}
										label={t("email")}
										variant='outlined'
									/>
								</FormControl>
								<FormControl sx={{ my: 1, width: "100%" }}>
									<TextField
										value={data.name}
										onChange={handleChange("name")}
										label={t("name")}
										variant='outlined'
									/>
								</FormControl>
								<FormControl sx={{ my: 1, width: "100%" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-password'>
										{t("pass")}
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password'
										type={data.showPassword ? "text" : "password"}
										value={data.password}
										onChange={handleChange("password")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge='end'
												>
													{data.showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
										label={t("pass")}
									/>
								</FormControl>
								<Button
									sx={{ my: 1, mb: 2, height: "50px", textTransform: "none" }}
									color='success'
									size='large'
									variant='contained'
									onClick={signup}
								>
									{t("reg_button")}
								</Button>
								<Divider />

								<div className={Style.signup__login}>
									<Link href='/auth'>{t("login_link")}</Link>
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
								className={Style.signup__content}
							>
								<div className={Style.signup__service}>
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
								{/*<Divider className={Style.divider}>Або</Divider>*/}
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
									/>
								</FormControl>

								<Button
									sx={{ my: 1, mb: 2, height: "50px" }}
									color='success'
									size='large'
									variant='contained'
									onClick={SignInPhone}
								>
									Зареєструватись
								</Button>

								<Divider />

								<div className={Style.signup__login}>
									<Link href='/auth'>Вже зареєстровані? Увійдіть</Link>
								</div>
							</Box>
						</TabPanel>
					</TabsUnstyled>
				</Box>
			</div>
		</Fade>
	)
}
