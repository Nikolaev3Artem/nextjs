import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProfile } from "../../interface/IUser"

interface UserState {
    user: IProfile[]
    // isLoading: boolean
    // erorr: string
}

const initialState: UserState = {
    user: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IProfile[]>) {
            state.user = action.payload
        },
        removeUser(state, action: PayloadAction<string>) {
            state.user = []
        },
    },
})

export default userSlice.reducer
export const { setUser, removeUser } = userSlice.actions
