import {commonApi} from "../common.api"
import {HYDRATE} from "next-redux-wrapper"

export const noteApi = commonApi.injectEndpoints({

    endpoints: (build) => ({
        getNote: build.query<any, any>({
            query: () => ({
                url: `api/note/`,
                method: "GET",
            }),
        }),
    }),

})
export const {
    useGetNoteQuery,
    util: {getRunningOperationPromises},
} = noteApi
export const {getNote} = noteApi.endpoints
