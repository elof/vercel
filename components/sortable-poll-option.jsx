import React from "react"
import { Flex, IconButton, Input, useColorModeValue } from "@chakra-ui/react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FiXCircle } from "react-icons/fi"
import { MdDragIndicator } from "react-icons/md"

export const SortablePollOption = ({
    animateLayoutChanges,
    editing = true,
    id,
    onChange,
    onKeyDown,
    onRemove,
    text = "",
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        animateLayoutChanges,
        id,
    })

    const bgColor = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.700")
    const buttonColor = useColorModeValue("gray.600", "gray.400")
    const isActive = attributes && !!attributes["aria-pressed"]

    const style = {
        outline: "none",
        position: "relative",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isActive ? 99999 : 0,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {editing ? (
                <Flex
                    bg={bgColor}
                    borderColor={isActive ? "purple.200" : "transparent"}
                    borderWidth={1}
                    borderRadius="md"
                    p={2}
                    position="relative"
                    shadow={isActive ? "base" : "none"}
                >
                    <IconButton
                        aria-label="Drag option"
                        color={buttonColor}
                        cursor="grab"
                        icon={<MdDragIndicator />}
                        variant="ghost"
                        {...listeners}
                    />
                    <Input
                        autoFocus
                        borderColor={borderColor}
                        focusBorderColor="purple.400"
                        mx={2}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder="Option label"
                        value={text}
                    />
                    <IconButton
                        aria-label="Remove option"
                        color={buttonColor}
                        onClick={onRemove}
                        icon={<FiXCircle />}
                        variant="ghost"
                    />
                </Flex>
            ) : (
                text
            )}
        </div>
    )
}
