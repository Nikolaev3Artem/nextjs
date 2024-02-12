import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const drawerSlice = createSlice({
	name: "drawer",
	initialState: {
		open: true
	},
	reducers: {
		setDrawer(state, action: PayloadAction) {
			state.open = !state.open
		},
		removeDrawer(state) {
			state.open = false
		}
	}
})

export default drawerSlice.reducer

export const { setDrawer, removeDrawer } = drawerSlice.actions
