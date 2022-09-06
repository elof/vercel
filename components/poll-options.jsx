import { Button, Text, VStack, useRadioGroup } from "@chakra-ui/react"
import { RadioButton } from "@/components/radio-button"

export const PollOptions = ({ onChange, onSubmit, options = [], selectedOption }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "poll",
        onChange,
    })
    const group = getRootProps()

    return (
        <>
            <Text fontWeight="semibold">Choose an option</Text>
            <VStack mb={7} {...group}>
                {options.map(({ id, text }) => {
                    const radio = getRadioProps({ value: id })
                    return (
                        <RadioButton key={id} {...radio}>
                            {text}
                        </RadioButton>
                    )
                })}
            </VStack>
            <Button
                bgColor="purple.500"
                colorScheme="purple"
                isDisabled={!selectedOption}
                onClick={onSubmit}
                variant="solid"
                w="full"
            >
                Vote
            </Button>
        </>
    )
}
