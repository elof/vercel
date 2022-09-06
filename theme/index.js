import { extendTheme } from "@chakra-ui/react"
import { colors } from "./colors"
import { global } from "./global"

export const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: true,
    },
    colors,
    shadows: {
        outline: "0 0 0 3px rgba(133, 133, 235, 0.4)",
    },
    styles: {
        global,
    },
})
