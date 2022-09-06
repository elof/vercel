import Head from "next/head"
import { Component } from "react"
import { useRouter } from "next/router"
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import jsc8 from "jsc8"
import shortId from "short-id"
import Layout from "@/components/layout"
import SortablePollForm from "@/components/sortable-poll-form"

const pageTitle = `Create a New Poll`

export const getServerSideProps = async () => {
    return {
        props: {
            jsc8Config: {
                url: process.env.MACROMETA_URL,
                fabricName: process.env.MACROMETA_FABRIC_NAME,
                apiKey: process.env.MACROMETA_API_KEY,
            },
            collectionName: process.env.MACROMETA_POLLS_COLLECTION_NAME,
        },
    }
}
class NewPollPage extends Component {
    state = {
        title: "",
        options: [],
        loading: false,
    }

    editing = null

    handleKeydown = (e) => {
        if (e.which === 27) this.handleToggleEdit(this.editing)
        if (e.which === 13) this.handleAddItem()
    }

    handleToggleEdit = (id) => {
        this.setState((prevState) => {
            const options = prevState.options
                .filter(({ text }) => text)
                .map((option) => {
                    if (option.id === id) {
                        if (!option.editing) {
                            this.editing = id
                        } else {
                            this.editing = null
                        }

                        return {
                            ...option,
                            editing: !option.editing,
                        }
                    }

                    return {
                        ...option,
                        editing: false,
                    }
                })

            return {
                ...prevState,
                options,
            }
        })
    }

    handleAddItem = () => {
        const id = shortId.generate()
        this.editing = id

        this.setState({
            ...this.state,
            options: [
                ...this.state.options,
                {
                    id,
                    text: "",
                    editing: true,
                    votes: 0,
                },
            ],
        })
    }

    handleTextChange = (e, id) => {
        const options = this.state.options.map((option) => {
            if (option.id === id) {
                return {
                    ...option,
                    text: e.target.value,
                }
            }
            return option
        })

        this.setState({ ...this.state, options })
    }

    handleSortEnd = (options) => {
        this.setState({ ...this.state, options })
    }

    handleDelete = (id) => {
        const options = this.state.options.filter((option) => option.id !== id)
        this.setState({ ...this.state, options })
    }

    handleTitleChange = (e) => {
        const { value } = e.target

        this.setState({
            title: value,
        })
    }

    handleCreate = () => {
        const { title, options } = this.state
        const _key = shortId.generate()

        const obj = {
            _key,
            pollName: title,
            polls: [...options],
        }

        this.setState({ loading: true }, () => {
            const client = new jsc8(this.props.jsc8Config)
            const collection = client.collection(this.props.collectionName)

            collection
                .save(obj)
                .then(() => {
                    const router = this.props.router
                    router.push({
                        pathname: "/poll/[_key]",
                        query: {
                            _key,
                        },
                        state: {
                            title,
                            options,
                            documentKey: _key,
                        },
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }

    render() {
        const { options, title, loading } = this.state
        const optionsWithText = options.filter(({ text }) => !!text.trim())
        const disableCreate = !title || optionsWithText.length < 2 || loading
        return (
            <>
                <Head>
                    <title>{pageTitle}</title>
                </Head>
                <Layout heading={pageTitle}>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Poll Title</FormLabel>
                        <Input
                            focusBorderColor="purple.400"
                            onChange={this.handleTitleChange}
                            placeholder="Give your poll a name"
                            value={title}
                        />
                    </FormControl>

                    <Box mb={7}>
                        <SortablePollForm
                            isLoading={!!loading}
                            options={options}
                            onAddItem={this.handleAddItem}
                            onKeyDown={this.handleKeydown}
                            onRemove={this.handleDelete}
                            onSortEnd={this.handleSortEnd}
                            onTextChange={this.handleTextChange}
                            onToggleEdit={this.handleToggleEdit}
                        />
                    </Box>

                    <Button
                        bgColor="purple.500"
                        colorScheme="purple"
                        isDisabled={disableCreate}
                        onClick={() => {
                            !disableCreate && this.handleCreate()
                        }}
                        variant="solid"
                        w="full"
                    >
                        {loading ? "Creating Poll..." : "Create Poll"}
                    </Button>
                </Layout>
            </>
        )
    }
}

function withHook(Component) {
    return function WrapperComponent(props) {
        const router = useRouter()
        return <Component {...props} router={router} />
    }
}

export default withHook(NewPollPage)
