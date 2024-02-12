import React from "react"
import MUIEditor, {
	MUIEditorState,
	toolbarControlTypes
	// @ts-ignore
} from "react-mui-draft-wysiwyg"
const TextEditorMui = () => {
	const [editorState, setEditorState] = React.useState(
		MUIEditorState.createEmpty()
	)

	const onChange = (newState: any) => {
		setEditorState(newState)
	}

	return <MUIEditor editorState={editorState} onChange={onChange} />
}

export default TextEditorMui
