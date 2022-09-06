import { Box, Flex, useRadio } from "@chakra-ui/react"
import { FiCheck } from "react-icons/fi"

export const RadioButton = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" w="full">
            <input {...input} />
            <Flex
                {...checkbox}
                alignItems="center"
                borderWidth={1}
                borderRadius="md"
                cursor="pointer"
                direction="row"
                justify="space-between"
                px={4}
                py={3}
                _checked={{
                    borderColor: "purple.400",
                    fontWeight: "semibold",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
            >
                {props.children}
                {input.checked && <FiCheck />}
            </Flex>
        </Box>
    )
}
