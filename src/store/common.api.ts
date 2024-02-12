import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"
import { HYDRATE } from "next-redux-wrapper"

import { RootState } from "./store"

export const commonApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).token.access
			const locale = (getState() as RootState).locale.lang

			headers.set("Content-Type", "application/json")
			headers.set("Accept-Language", `${Cookies.get("locale")}`)
			if (token) {
				headers.set("authorization", `Bearer ${Cookies.get("access")}`)
				headers.set("authorization", `Bearer ${token}`)
			}
			return headers
		}
	}),

	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},

	tagTypes: [],
	endpoints: (_) => ({})
})
