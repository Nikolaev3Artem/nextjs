import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IToken } from "../../interface/IUser"

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        access: "",
        refresh: "",
    } as IToken,
    reducers: {
        setToken(state, action: PayloadAction<IToken>) {
            state.access += action.payload.access
            state.refresh += action.payload.refresh
        },
        removToken(state) {
            state.access = ""
            state.refresh = ""
        },
    },
})

export default tokenSlice.reducer

export const { setToken, removToken } = tokenSlice.actions
