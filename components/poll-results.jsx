import { Box, Flex, Progress, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { FiCheck } from "react-icons/fi"

export const PollResults = ({ options = [], selectedOption }) => {
    const totalVotes = options.reduce((aggr, curr) => aggr + curr.votes, 0)
    const defaultColor = useColorModeValue("gray.500", "gray.400")
    const selectedColor = useColorModeValue("purple.500", "white")

    return (
        <>
            <Text fontWeight="semibold">Results ({totalVotes} votes)</Text>
            <VStack mb={7} spacing={6}>
                {options.map(({ id, text, votes }) => {
                    const isSelected = selectedOption === id
                    const ratio = (votes / totalVotes) * 100
                    const score = ratio.toFixed(2) || 0
                    return (
                        <Box key={id} w="full">
                            <Flex
                                color={isSelected ? selectedColor : defaultColor}
                                justify="space-between"
                                mb={2}
                            >
                                <Flex align="center">
                                    <Text
                                        as="span"
                                        fontWeight={isSelected ? "bold" : "normal"}
                                        mr={2}
                                    >
                                        {text}
                                    </Text>
                                    {isSelected && <FiCheck />}
                                </Flex>
                                <Text
                                    as="span"
                                    fontWeight={isSelected ? "bold" : "normal"}
                                >{`${votes} votes • ${score}%`}</Text>
                            </Flex>
                            <Progress
                                borderRadius="sm"
                                colorScheme={isSelected ? "purple" : "gray"}
                                hasStripe={isSelected}
                                size="sm"
                                value={ratio}
                            />
                        </Box>
                    )
                })}
            </VStack>
        </>
    )
}
