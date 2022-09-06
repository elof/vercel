import { Container, Flex, Heading, Link } from "@chakra-ui/react"
import { Logo } from "@/components/logo"

const Layout = ({ children, heading }) => {
    return (
        <>
            <Flex align="center" px={4} py={3}>
                <Logo />
            </Flex>
            <Container pt={32} w="6xl">
                <Heading mb={8} size="lg">
                    {heading}
                </Heading>
                {children}
            </Container>
        </>
    )
}

export default Layout
