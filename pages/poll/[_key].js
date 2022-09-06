import { useCallback, useContext, useEffect, useState } from "react"
import { FabricContext } from "@/contexts/fabric-context"
import Head from "next/head"
import Layout from "@/components/layout"
import Poll from "@/components/poll"

export async function getServerSideProps() {
    return {
        props: {
            config: {
                url: process.env.MACROMETA_URL,
                fabricName: process.env.MACROMETA_FABRIC_NAME,
                apiKey: process.env.MACROMETA_API_KEY,
            },
        },
    }
}

const PollDetailPage = ({ config }) => {
    const { establishLiveConnection, isSignedIn, getPollData, onSubmitVote, updateFabric } =
        useContext(FabricContext)

    const [hasVoted, setHasVoted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [pollTitle, setPollTitle] = useState("")
    const [pollOptions, setPollOptions] = useState([])
    const [selection, setSelection] = useState(null)

    const fetchData = useCallback(async () => {
        const data = await getPollData(true)
        setPollOptions(Object.values(data.polls))
        setPollTitle(data.pollName)
    }, [])

    const onSelect = useCallback((id) => {
        setSelection(id)
    }, [])

    const onSubmit = useCallback(() => {
        setIsLoading(true)
        onSubmitVote(selection)
            .then(async () => {
                fetchData()
                setHasVoted(true)
                setIsLoading(false)
                const onMessage = (msg) => {
                    const { payload } = JSON.parse(msg)
                    const decoded = JSON.parse(atob(payload))
                    setPollOptions(decoded.polls)
                    setPollTitle(decoded.pollName)
                }
                establishLiveConnection(onMessage)
            })
            .catch((err) => console.error(err))
    }, [pollTitle, selection])

    useEffect(() => {
        if (config) {
            updateFabric(config)
        }
        if (isSignedIn) {
            fetchData()
        }
    }, [isSignedIn])

    const pageTitle = isLoading || !pollTitle ? "Loading poll..." : pollTitle

    return (
        <>
            <Head>
                <title>{`Poll: ${pageTitle}`}</title>
            </Head>
            <Layout heading={pageTitle}>
                <Poll
                    hasVoted={hasVoted}
                    isLoading={isLoading}
                    onSelect={(id) => onSelect(id)}
                    onSubmit={onSubmit}
                    options={pollOptions}
                    selection={selection}
                    title={pollTitle}
                />
            </Layout>
        </>
    )
}

export default PollDetailPage
