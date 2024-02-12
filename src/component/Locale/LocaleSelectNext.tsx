import { useRouter } from "next/router"
import React, { useEffect } from "react"
import Link from "next/link"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import { ListItem, ListItemButton, Stack } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import Cookies from "js-cookie"

interface ILocales {
    locale?: string
    locales?: string[] | undefined
}

export const LocaleSelectNext = () => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1)

    const router = useRouter()
    const { locales, locale: activeLocale } = router

    const otherLocales = (locales || []).filter(
        (locale) => locale !== activeLocale,
        activeLocale && Cookies.set("locale", activeLocale || "uk")
    )

    return (
        <Box>
            <List sx={{ display: "flex" }}>
                {otherLocales.map((locale) => {
                    const { pathname, query, asPath } = router
                    return (
                        <ListItem key={locale}>
                            <Link
                                href={{ pathname, query }}
                                as={asPath}
                                locale={locale}
                            >
                                {locale}
                            </Link>
                        </ListItem>
                    )
                })}
            </List>
            {/*<List>*/}
            {/*    {router.locales?.map((locale: string) => (*/}
            {/*        <ListItem key={locale}>*/}
            {/*            <Link href={router.asPath} locale={locale}>*/}
            {/*                <a>{locale}</a>*/}
            {/*            </Link>*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
        </Box>
    )
}
