import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"
import context from "react-redux/src/components/Context"

import { RootState } from "./store"

export const authApi = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_URL,
		prepareHeaders: (headers, { getState, endpoint }) => {
			// const locale = (getState() as RootState).locale.lang

			headers.set("Content-Type", "application/json")
			// headers.set("Accept-Language", "uk")
			if (Cookies.get("access")) {
				headers.set("authorization", `Bearer ${Cookies.get("access")}`)
			}
			return headers
		}
	}),
	tagTypes: [""],
	endpoints: (_) => ({})
})
