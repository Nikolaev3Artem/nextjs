import axios from "axios"
import { getCookie } from "cookies-next"
import { enqueueSnackbar } from "notistack"

import { IEditorText } from "../interface/IEditorText"

interface IOnSubmit {
	res: IEditorText[]
	rout: string
	setIsLoading?: boolean
	data: string
	dataTwo: string
	lang: string
}
export async function onSubmitForm({
	res,
	rout,
	setIsLoading,
	data,
	dataTwo,
	lang
}: IOnSubmit) {
	try {
		const formData = new FormData()
		formData.append("text", data || "")
		formData.append("text2", dataTwo || "")
		const response = await axios.put(
			`http://127.0.0.1:8000/${lang}/api/${rout}/update/${res[0].id}`,
			formData,
			{
				headers: {
					Authorization: "Bearer " + getCookie("access"),
					"Content-Type":
						"multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
				}
			}
		)
		if (response.status === 200) {
			enqueueSnackbar("Ваші зміни збережені", { variant: "success" })
		}
	} catch (error) {
		console.error(error)
		enqueueSnackbar("Помилка збереження змін", { variant: "error" })
	}
}
