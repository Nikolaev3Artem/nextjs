import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import editorSlice from "./admin/about/EditorSlice"
import accordionOpenSlice from "./admin/accordion/accordionOpenSlice"
import drawerSlice from "./admin/drawerSlice"
import homeModalSlice from "./admin/home/homeModalSlice"
import { authApi } from "./auth.api"
import tokenSlice from "./auth/tokenSlice"
import { userApi } from "./auth/user.api"
import userSlice from "./auth/userSlice"
import { commonApi } from "./common.api"
import localeSlice from "./localeSlice"
import { noteApi } from "./note/note.api"
import popularSlice from "./popular/popularSlice"

const rootReducer = combineReducers({
	token: tokenSlice,
	user: userSlice,
	locale: localeSlice,
	popular: popularSlice,
	drawer: drawerSlice,
	modal: homeModalSlice,
	editor: editorSlice,
	accordion: accordionOpenSlice,
	[commonApi.reducerPath]: commonApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[noteApi.reducerPath]: noteApi.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat(
				commonApi.middleware,
				authApi.middleware,
				userApi.middleware,
				noteApi.middleware
			)
	})
}

// export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const wrapper = createWrapper<AppStore>(setupStore, { debug: false })
