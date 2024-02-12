import React from "react"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import Box from "@mui/material/Box"
import Banner from "../../component/Banner/Banner"
import bg from "../../../public/bg.png"
import LayoutContent from "../../component/Layout/Content/LayoutContent"
import Rule from "../../component/Rule/Rule"
import { IBanner } from "../../interface/IBanner"
import { IEditorText } from "../../interface/IEditorText"
import { wrapper } from "../../store/store"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Style from "./parcel.module.scss"
import Parcel from "../../component/Prscel/Parcel"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale
		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
		const texts = await axios.get(`${BASE_URL}${locale}/api/parcel/`)
		const res = response.data
		const text = texts.data

		return {
			props: {
				res,
				text,
				...(locale && (await serverSideTranslations(locale)))
			}
		}
	}
)

export interface IRuleProps {
	res: IBanner[]
	text: IEditorText[]
}

const Index = ({ res, text }: IRuleProps) => {
	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					<Box className={Style.rule_content}>
						{res && res[0]?.is_active === true ? (
							<Banner
								img={res[0]?.img}
								alt={res[0]?.alt}
								h1={res[0]?.h1}
								description={res[0]?.description}
							/>
						) : (
							<Banner
								h1={res[0]?.h1}
								description={res[0]?.description}
								img={bg.src || ""}
								alt={"img"}
							/>
						)}
					</Box>
				</LayoutTopContent>
				<LayoutContent>
					<Parcel text={text[0]?.text} text2={text[0]?.text2} />
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}

export default Index
