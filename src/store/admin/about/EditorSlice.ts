import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IEditorData {
	data: ""
	dataTwo: ""
}

const editorSlice = createSlice({
	name: "editor",
	initialState: {
		data: "",
		dataTwo: ""
	} as IEditorData,
	reducers: {
		setEditorData(state, action: PayloadAction<any>) {
			state.data = action.payload
		},
		setEditorDataTwo(state, action: PayloadAction<any>) {
			state.dataTwo = action.payload
		}
	}
})

export default editorSlice.reducer

export const { setEditorData, setEditorDataTwo } = editorSlice.actions
