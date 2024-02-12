import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const homeModalSlice = createSlice({
	name: "modal",
	initialState: {
		open: false
	},
	reducers: {
		setOpen(state, action: PayloadAction) {
			state.open = !state.open
		},
		setCloseModal(state) {
			state.open = false
		}
	}
})

export default homeModalSlice.reducer

export const { setOpen, setCloseModal } = homeModalSlice.actions
