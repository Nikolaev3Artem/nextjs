import { Fade, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import axios, { AxiosError } from "axios"
import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Error from "next/error"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { IRent } from "../../../../interface/IRent"
import LayoutDashboard from "../../../../component/Layout/Dashboard/LayoutDashboard"
import ContentDashboard from "../../../../component/Layout/Dashboard/Content/ContentDashboard"
import AddRentCard from "../../../../component/Dashboard/Rent/Form/AddRentCard"

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res,
	locale,
	req
}) => {
	const BASE_URL: string | undefined = process.env.REACT_APP_URL
	const local = locale

	const response = await fetch(`${BASE_URL}${local}/api/service/bus/`, {
		headers: {
			Authorization: "Bearer " + req.cookies.access
		}
	})

	const errorCode = response.ok ? false : response.status
	const serviceBus = await response.json()

	return {
		props: {
			errorCode,
			serviceBus,
			...(local && (await serverSideTranslations(local)))
		}
	}
}

export interface IServiceBus {
	id?: string
	name?: string
}

export interface IServiceBusProps {
	serviceBus?: IServiceBus[]
	errorCode?: any
}

const Index = ({ serviceBus, errorCode }: IServiceBusProps) => {
	const rout = useRouter()

	if (errorCode) {
		typeof window !== "undefined" && rout.push("/auth")
		return <Error statusCode={errorCode} title={errorCode.title} />
	}

	// const handleBack = () => {
	// 	rout.back()
	// }
	const { t } = useTranslation()

	return (
		<>
			<LayoutDashboard>
				<Fade in={true} timeout={600}>
					<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
						<ContentDashboard
							// title={`ID ` + `${rent.id}` + `: ` + `${rent.name}`}
							title={"new_add"}
						>
							<AddRentCard serviceBus={serviceBus} />
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}

export default Index
