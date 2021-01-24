import React, { useContext, useReducer, useRef } from 'react'
import { Button, Container, Flex, NavLink, Input, Label, Checkbox } from 'theme-ui'
import { Link } from "gatsby"
import { IdentityContext } from "../../netlifyIdentityContext"
import { gql, useMutation, useQuery } from '@apollo/client'

const ADD_TODO = gql`
    mutation AddTodo($text: String!){
        addTodo(text: $text){
            id
        }
    }
`;
const GET_TODOS = gql`
    query GetTodos {
        todos{
            id
            text
            done
          }
    }
`;

const UPDATE_TODO_DONE = gql`
    mutation UpdateTodoDone($id: ID!){
        updateTodoDone(id: $id) {
            text
            done
        }
    }

`;

const todoReducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return [{
                done: false,
                value: action.payload
            },
            ...state
            ]
        case "toggleTodo":
            const newState = [...state]
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            return newState
    }
}





const Dashboard = () => {

    const { user, identity } = useContext(IdentityContext)
    const inputRef = useRef()
    //const [todos, setTodos] = useState([])
    //const [todos, dispatch] = useReducer(todoReducer, [])
    const [addTodo] = useMutation(ADD_TODO)
    const [updateTodoDone] = useMutation(UPDATE_TODO_DONE)
    const { loading, error, data, refetch } = useQuery(GET_TODOS)
   



    return (
        <Container>
            <Flex as="nav" >
                <NavLink as={Link} to="/" p={2} >
                    Home

                </NavLink>
                <NavLink as={Link} to="/app" p={2} >
                    Dashboard

                    </NavLink>

                {user && (<NavLink as={Link} to="/app" p={2}
                    onClick={() => {
                        identity.logout()
                    }} >
                    {` Logout ${user.user_metadata.full_name}`}
                </NavLink>)}

            </Flex>

            <Flex as="form"
                onSubmit={async e => {
                    e.preventDefault();
                    /*
                        setTodos([{
                            done: false,
                            value: inputRef.current.value
                        },
                        ...todos
                        ])
                        */
                    await addTodo({ variables: { text: inputRef.current.value } })
                    inputRef.current.value = "";
                    await refetch()
                }

                }
            >
                <Label sx={{ display: "flex" }} >
                    <span>Add&nbsp;todo</span>
                    <Input ref={inputRef} sx={{ marginLeft: 1 }} />
                </Label>
                <Button sx={{ marginLeft: 1 }} >Submit</Button>

            </Flex>
            <Flex sx={{ flexDirection: "column" }} >
                {loading ? <div>loading</div> : null}
                {error ? <div>{error.message}</div> : null}
                {!loading && !error && (
                    <ul sx={{ listStyleType: 'none' }}  >
                        {
                            data.todos.map((todo) => (
                                <Flex as="li"
                                    key={todo.id}
                                    onClick={async () => {
                                        await updateTodoDone({
                                            variables: { id: todo.id }
                                        })
                                        console.log("refetching")
                                        await refetch()

                                    }
                                    }

                                >
                                    <Checkbox checked={todo.done}
                                        readOnly
                                    />
                                    <span>{todo.text}</span>
                                </Flex>
                            ))
                        }
                    </ul>)

                }


            </Flex>
        </Container>
    )
}

export default Dashboard;