import React, { useState } from "react"
import jsc8 from "jsc8"

// This is very bad
const POLLS_COLLECTION_NAME = process.env.NEXT_PUBLIC_MACROMETA_POLLS_COLLECTION_NAME

const defaultState = {
    isSignedIn: false,
    fabric: null,
}

export const FabricContext = React.createContext(defaultState)

class FabricProvider extends React.Component {
    state = {
        isSignedIn: false,
        fabric: null,
        config: "",
    }

    componentWillUnmount() {
        const { fabric } = this.state
        fabric && fabric.close()
    }

    updateFabric = async (config) => {
        const client = new jsc8(config)

        this.setState({
            fabric: client,
            isSignedIn: true,
            config: config.url,
        })
    }

    updateCollectionData = (obj) => {
        const { fabric } = this.state
        const collection = fabric.collection(POLLS_COLLECTION_NAME)
        return collection.save(obj)
    }

    establishLiveConnection = async (onmessage) => {
        const { fabric } = this.state

        const ws = await fabric.createStreamReader(
            POLLS_COLLECTION_NAME,
            `${POLLS_COLLECTION_NAME}-${Math.round(Math.random() * 99999)}`,
            true,
            true,
        )

        ws.on("open", () => console.log(`Connection opened for ${POLLS_COLLECTION_NAME}`))
        ws.on("message", onmessage)
        ws.on("error", (e) => console.error(`Connection errored for ${POLLS_COLLECTION_NAME}: ${e}`))
        ws.on("close", () => console.log(`Connection closed for ${POLLS_COLLECTION_NAME}`))
    }

    getDocumentKey = () => window.location.pathname.split("/poll/")[1]

    onSubmitVote = async (selectedPollId) => {
        const { fabric } = this.state
        const documentKey = this.getDocumentKey()

        const voteArr = await this.getPollData()

        const voteObj = voteArr.find((vote) => vote.id === selectedPollId)
        voteObj.votes += 1

        const pollObj = { polls: [...voteArr] }

        const updatePollQuery = `UPDATE "${documentKey}" WITH ${JSON.stringify(
            pollObj,
        )} in ${POLLS_COLLECTION_NAME}`
        return fabric.query(updatePollQuery)
    }

    getPollData = async (allData) => {
        const documentKey = this.getDocumentKey()
        const { fabric } = this.state
        const query = `FOR x in ${POLLS_COLLECTION_NAME} FILTER x._key=="${documentKey}" return x`
        const cursor = await fabric.query(query)
        const results = await cursor.all()
        return allData ? results[0] : results[0].polls
    }

    render() {
        const { isSignedIn, fabric } = this.state
        const { children } = this.props

        return (
            <FabricContext.Provider
                value={{
                    isSignedIn,
                    fabric,
                    updateFabric: this.updateFabric,
                    updateCollectionData: this.updateCollectionData,
                    onSubmitVote: this.onSubmitVote,
                    getPollData: this.getPollData,
                    establishLiveConnection: this.establishLiveConnection,
                }}
            >
                {children}
            </FabricContext.Provider>
        )
    }
}

export default FabricProvider
