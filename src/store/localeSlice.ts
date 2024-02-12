import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILocale {
    lang: any
}

const localeSlice = createSlice({
    name: "locale",
    initialState: {
        lang: "uk",
    } as ILocale,
    reducers: {
        setLocales(state, action: PayloadAction<any>) {
            state.lang = action.payload
        },
    },
})

export default localeSlice.reducer

export const { setLocales } = localeSlice.actions
