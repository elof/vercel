import { Center, Spinner } from "@chakra-ui/react"
import { PollOptions } from "@/components/poll-options"
import { PollResults } from "@/components/poll-results"

const Poll = ({ hasVoted, isLoading, onSelect, onSubmit, options = [], selection }) => {
    return (
        <>
            {isLoading ? (
                <Center py={24}>
                    <Spinner />
                </Center>
            ) : hasVoted ? (
                <PollResults options={options} selectedOption={selection} />
            ) : (
                <PollOptions
                    onChange={onSelect}
                    onSubmit={onSubmit}
                    options={options}
                    selectedOption={selection}
                />
            )}
        </>
    )
}

export default Poll
