import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IPopular } from "../../interface/IPopular"

const popularSlice = createSlice({
	name: "popular",
	initialState: {
		val1: "",
		val2: "",
		active: false
	} as IPopular,
	reducers: {
		setPopular(state, action: PayloadAction<IPopular>) {
			state.val1 += action.payload.val1
			state.val2 += action.payload.val2
			state.active = action.payload.active
		},
		removePopular(state: IPopular) {
			state.val1 = ""
			state.val2 = ""
			state.active = false
		}
	}
})

export default popularSlice.reducer

export const { setPopular, removePopular } = popularSlice.actions
