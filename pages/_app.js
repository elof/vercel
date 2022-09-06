import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import FabricProvider from "@/contexts/fabric-context"
import { theme } from "../theme"

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <FabricProvider>
                <Head>
                    <title>Macrometa Polling App</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content="Sample" />
                    <meta name="keywords" content="sample, something" />
                </Head>
                <Component {...pageProps} />
            </FabricProvider>
        </ChakraProvider>
    )
}

export default MyApp
