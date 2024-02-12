import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import bg from "../../../public/bg.png"
import About from "../../component/About/About"
import Banner from "../../component/Banner/Banner"
import LayoutContent from "../../component/Layout/Content/LayoutContent"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import { IEditorText } from "../../interface/IEditorText"
import { IBanner } from "../../interface/IBanner"
import { wrapper } from "../../store/store"
import Style from "../Home.module.scss"

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale
		const response = await axios.get<IBanner>(`${BASE_URL}${locale}/api/main/`)
		const texts = await axios.get(`${BASE_URL}${locale}/api/about/`)
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

export interface IAboutProps {
	res: IBanner[]
	text: IEditorText[]
}

function Index({ res, text }: IAboutProps) {
	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					<Box className={Style.content}>
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
					<Box px={2}>
						<About text={text[0]?.text} text2={text[0]?.text2} />
					</Box>
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}

export default Index
