import { HYDRATE } from "next-redux-wrapper"

import { commonApi } from "../common.api"

export const mainApi = commonApi.injectEndpoints({
	endpoints: (build) => ({
		getMain: build.query<any, any>({
			query: () => ({
				url: `api/main/`,
				method: "GET"
			})
		})
	})
})
export const {
	useGetMainQuery,
	util: { getRunningOperationPromises }
} = mainApi
export const { getMain } = mainApi.endpoints
