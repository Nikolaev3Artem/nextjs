import React from "react"

import Style from "./rule.module.scss"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import Box from "@mui/material/Box"
import Banner from "../../component/Banner/Banner"
import bg from "../../../public/bg.png"
import LayoutContent from "../../component/Layout/Content/LayoutContent"
import { wrapper } from "../../store/store"
import axios from "axios"
import { IBanner } from "../../interface/IBanner"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { IEditorText } from "../../interface/IEditorText"
import Rule from "../../component/Rule/Rule"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale
		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
		const texts = await axios.get(`${BASE_URL}${locale}/api/rule/`)
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

const Index = ({ res, text }: IRuleProps): JSX.Element => {
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
					<Rule text={text[0]?.text} text2={text[0]?.text2} />
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}

export default Index
