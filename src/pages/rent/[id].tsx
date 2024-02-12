import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ParsedUrlQuery } from "querystring"
import React from "react"

import bg from "../../../public/bg.png"
import Banner from "../../component/Banner/Banner"
import LayoutContent from "../../component/Layout/Content/LayoutContent"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import RentCard from "../../component/Rent/Card/RentCard"
import CardInfo from "../../component/Rent/CardInfo/CardInfo"
import CardInfoModal from "../../component/Rent/Modal/CardInfoModal"
import { IBanner } from "../../interface/IBanner"
import { IRent } from "../../interface/IRent"
import { wrapper } from "../../store/store"
import Style from "../parcel/parcel.module.scss"

interface Params extends ParsedUrlQuery {
	id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const BASE_URL: string | undefined = process.env.REACT_APP_URL
	const { id } = context.params as Params

	const locale = context.locale
	const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
	const rent = await axios.get<IRent>(`${BASE_URL}${locale}/api/rent/${id}`)
	const res = response.data
	const rents = rent.data

	return {
		props: {
			res,
			rents,
			...(locale && (await serverSideTranslations(locale)))
		}
	}
}

export interface IRentProps {
	res: IBanner[]
	rents: IRent
}
const Id = ({ res, rents }: IRentProps) => {
	return (
		<>
			{/*<CardInfo*/}
			{/*	// id={rents.id}*/}
			{/*	name={rents.name}*/}
			{/*	images={rents.images}*/}
			{/*	poster={rents.poster}*/}
			{/*	places={rents.places}*/}
			{/*	floor={rents.floor}*/}
			{/*	busIdService={rents.busIdService}*/}
			{/*/>*/}
		</>
	)
}

export default Id
