import React from "react"
import { Box, Button, Center, Text, useColorModeValue } from "@chakra-ui/react"
import { FiPlusCircle } from "react-icons/fi"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MeasuringStrategy,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers"
import {
    arrayMove,
    defaultAnimateLayoutChanges,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { SortablePollOption } from "./sortable-poll-option"

const SortablePollForm = ({
    isLoading,
    onAddItem,
    onKeyDown,
    onRemove,
    onSortEnd,
    onTextChange,
    options,
}) => {
    const animateLayoutChanges = (args) =>
        defaultAnimateLayoutChanges({ ...args, wasDragging: true })

    const borderColor = useColorModeValue("gray.200", "gray.700")

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const onDragEnd = (e) => {
        const { active, over } = e
        if (active.id !== over.id) {
            const ids = options.map((o) => o.id)
            const prevIndex = ids.indexOf(active.id)
            const newIndex = ids.indexOf(over.id)
            onSortEnd(arrayMove(options, prevIndex, newIndex))
        }
    }

    return (
        <>
            <Box borderColor={borderColor} borderWidth={1} borderRadius="md" mb={2} p={2}>
                {options.length > 0 ? (
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={onDragEnd}
                        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
                        modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
                        sensors={sensors}
                    >
                        <SortableContext items={options} strategy={verticalListSortingStrategy}>
                            {options.map(({ id, text }) => (
                                <SortablePollOption
                                    animateLayoutChanges={animateLayoutChanges}
                                    id={id}
                                    key={id}
                                    onChange={(e) => onTextChange(e, id)}
                                    onKeyDown={onKeyDown}
                                    onRemove={() => onRemove(id)}
                                    text={text}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                ) : (
                    <Center>
                        <Text as="span" fontSize="sm" opacity={0.5} py={4}>
                            Add options to your poll
                        </Text>
                    </Center>
                )}
            </Box>
            <Button
                colorScheme="purple"
                isDisabled={isLoading}
                leftIcon={<FiPlusCircle />}
                onClick={() => !isLoading && onAddItem()}
                size="sm"
                variant="text"
            >
                Add option
            </Button>
        </>
    )
}

// NewPoll.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onToggleEdit: PropTypes.func.isRequired,
//   onTextChange: PropTypes.func.isRequired,
//   onKeyDown: PropTypes.func.isRequired,
//   onSortEnd: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// }

export default SortablePollForm
