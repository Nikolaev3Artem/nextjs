import createCache from "@emotion/cache"
import { CacheProvider, EmotionCache } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import IconButton from "@mui/material/IconButton"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { DevSupport } from "@react-buddy/ide-toolbox-next"
import { appWithTranslation } from "next-i18next"
import { createWrapper } from "next-redux-wrapper"
import { AppProps } from "next/app"
import Head from "next/head"
import { SnackbarProvider, closeSnackbar } from "notistack"
import * as React from "react"
import { MdOutlineClose } from "react-icons/md"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider } from "react-redux"

import { ComponentPreviews, useInitial } from "../components/dev"
import createEmotionCache from "../createEmotionCache"
import { setupStore } from "../store/store"
import "../styles/globals.scss"
import "../styles/react-draft-wysiwyg.scss"
import theme from "../theme"

const store = setupStore()
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false
// 		}
// 	}
// })

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

export function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	return (
		// <QueryClientProvider client={queryClient}>
		<CacheProvider
			value={emotionCache}
			// value={createCache({ key: "scss" })}
		>
			<Provider store={store}>
				<Head>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<SnackbarProvider
						style={{ marginTop: 53, marginRight: 2 }}
						maxSnack={3}
						action={(snackbarId) => (
							<IconButton onClick={() => closeSnackbar(snackbarId)}>
								<MdOutlineClose />
							</IconButton>
						)}
						autoHideDuration={2500}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
					>
						<DevSupport
							ComponentPreviews={ComponentPreviews}
							useInitialHook={useInitial}
						>
							<Component {...pageProps} />
						</DevSupport>
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</CacheProvider>
		// 	<ReactQueryDevtools initialIsOpen={false} />
		// </QueryClientProvider>
	)
}

const wrapper = createWrapper(setupStore)
export default appWithTranslation(App)
