import { Box, Button } from "@chakra-ui/react"
import jsc8 from "jsc8"
import Layout from "@/components/layout"
import Link from "next/link"

export const getServerSideProps = async () => {
    const client = new jsc8({
        url: process.env.MACROMETA_URL,
        fabricName: process.env.MACROMETA_FABRIC_NAME,
        apiKey: process.env.MACROMETA_API_KEY,
    })
    const collection = process.env.MACROMETA_CONTENT_COLLECTION_NAME
    const results = await client.executeQuery(`For doc IN ${collection} RETURN doc`)

    return {
        props: {
            title: results[0].title,
            content: results[0].content,
        },
    }
}

const Index = ({ title, content }) => {
    return (
        <Layout>
            <Box dangerouslySetInnerHTML={{ __html: title }}></Box>
            <Box dangerouslySetInnerHTML={{ __html: content }} mb={6}></Box>
            <Link href="/new">
                <Button size="lg" variant="outline">
                    Create a Poll
                </Button>
            </Link>
        </Layout>
    )
}

export default Index
