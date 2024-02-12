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

import EditCardInfo from "../../../component/Dashboard/Rent/EditCardInfo/EditCardInfo"
import ContentDashboard from "../../../component/Layout/Dashboard/Content/ContentDashboard"
import LayoutDashboard from "../../../component/Layout/Dashboard/LayoutDashboard"
import { IRent } from "../../../interface/IRent"
import { IServiceBus } from "./add"

interface Params extends ParsedUrlQuery {
	id: string
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res,
	locale,
	req
}) => {
	const BASE_URL: string | undefined = process.env.REACT_APP_URL
	const { id } = params as Params
	const local = locale

	const response1 = await fetch(`${BASE_URL}${local}/api/service/bus/`, {
		headers: {
			Authorization: "Bearer " + req.cookies.access
		}
	})
	const serviceBus = await response1.json()

	const response = await fetch(`${BASE_URL}${local}/api/rent/admin/${id}/`, {
		headers: {
			Authorization: "Bearer " + req.cookies.access
		}
	})

	const errorCode = response.ok ? false : response.status
	const rent = await response.json()

	return {
		props: {
			errorCode,
			serviceBus,
			rent,
			...(local && (await serverSideTranslations(local)))
		}
	}
}

export interface IRentProps {
	rent: IRent
	errorCode?: any
	serviceBus?: readonly IServiceBus[]
}

const Id = ({ rent, errorCode, serviceBus }: IRentProps) => {
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
							title={(rent && `${rent.name}`) || "Імя"}
						>
							{rent && <EditCardInfo rent={rent} serviceBus={serviceBus} />}
						</ContentDashboard>
					</Box>
				</Fade>
			</LayoutDashboard>
		</>
	)
}

export default Id
