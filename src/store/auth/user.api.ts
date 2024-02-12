import { IProfile, IToken } from "../../interface/IUser"
import { authApi } from "../auth.api"

interface ICredencial {
    email: string
    password: string
}

interface IData {
    token: IToken
}

export const userApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<IProfile[], string>({
            query: () => ({
                url: `api/customer`,
                method: "GET",
            }),
            // transformResponse: (response: IProfile[]) => ({ ...response }),
            // providesTags: ["User"],
        }),
        getToken: build.mutation<IData, ICredencial>({
            query: (credencial) => ({
                url: `auth/jwt/create`,
                method: "POST",
                body: credencial,
            }),
            // invalidatesTags: ["User"],
            // transformResponse: (response: { data: IData }) => response.data,
        }),
        createUser: build.mutation({
            query: (formData) => ({
                url: `auth/users/`,
                method: "POST",
                body: formData,
            }),
        }),

        updateUser: build.mutation<IProfile, IProfile>({
            query: (values) => ({
                url: `worker/update/`,
                method: "PUT",
                body: values,
            }),
        }),
    }),
})

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useGetTokenMutation,
} = userApi
