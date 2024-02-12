import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import * as React from "react"

import LayoutContent from "../../component/Layout/Content/LayoutContent"
import LayoutDefault from "../../component/Layout/Default/LayoutDefault"
import LayoutTopContent from "../../component/Layout/TopContent/LayoutTopContent"
import DatePicker from "../../component/Order/Datapicker/Datapicker"
import Input from "../../component/Order/Input/Input"
import {
	getNote,
	getRunningOperationPromises,
	useGetNoteQuery
} from "../../store/note/note.api"
import { wrapper } from "../../store/store"
import Style from "./note.module.scss"

interface IRes {
	id?: string
	header: string
	body: string
}

interface Props {
	res: IRes[]
	locale?: string[] | undefined
}

export const getServerSideProps = wrapper.getServerSideProps<Props>(
	(store) => async (context) => {
		const BASE_URL: string | undefined = process.env.REACT_APP_URL
		const locale = context.locale

		await store.dispatch(getNote.initiate(""))

		const response = await axios.get(`${BASE_URL}${locale}/api/note/`)
		const res = response.data

		return {
			props: {
				res,
				...(locale && (await serverSideTranslations(locale)))
			}
		}

		// if (lang !== undefined) {
		//     const response = await axios.get(
		//         `http://127.0.0.1:8000/${lang2}/api/note/`
		//     )
		//     const res = response.data
		//
		//     return {
		//         props: { res },
		//     }
		// } else {
		//     const response = await axios.get("http://127.0.0.1:8000/api/note/")
		//     const res = response.data
		//
		//     return {
		//         props: { res },
		//     }
		// }
	}
)

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
//     props: {
//         ...(locale && (await serverSideTranslations(locale, ['content']))),
//     },
// })
// _props: InferGetServerSidePropsType<typeof getServerSideProps>
export default function Note({ res }: any) {
	const router = useRouter()
	const { t } = useTranslation("сontent")

	return (
		<>
			<LayoutDefault>
				<LayoutTopContent>
					{/*<h1 className={Style.test}>{t("msg")}</h1>*/}
				</LayoutTopContent>
				<LayoutContent>
					<Input />
					<Input />
					<DatePicker />

					{/*{res &&*/}
					{/*	res.map((i: any) => (*/}
					{/*		<div key={i.id}>*/}
					{/*			<h1 style={{ color: "#757ce8" }}>{i.header}</h1>*/}
					{/*			<span style={{ color: "#757ce8" }}>{i.body}</span>*/}
					{/*		</div>*/}
					{/*	))}*/}
				</LayoutContent>
			</LayoutDefault>
		</>
	)
}
