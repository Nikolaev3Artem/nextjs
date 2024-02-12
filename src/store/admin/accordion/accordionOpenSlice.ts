import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const accordionOpenSlice = createSlice({
	name: "accordion",
	initialState: {
		open: false
	},
	reducers: {
		setAccordionOpen(state, action: PayloadAction) {
			state.open = !state.open
		},
		setAccordionClose(state) {
			state.open = false
		}
	}
})

export default accordionOpenSlice.reducer

export const { setAccordionOpen, setAccordionClose } =
	accordionOpenSlice.actions
