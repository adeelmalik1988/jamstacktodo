import React, { useContext, useReducer, useRef, useState } from 'react'
import { Button, Container, Heading, Flex, NavLink, Input, Label, Checkbox } from 'theme-ui'
import { Link } from "gatsby"
import { IdentityContext } from "./../../netlifyIdentityContext"

const todoReducer = (state, action) => {
    switch(action.type) {
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
    const [todos, dispatch] = useReducer(todoReducer, [])


    return (
        <Container>
            <Flex as="nav" >
                <NavLink as={Link} to="/" p={2} >
                    Home

                </NavLink>
                <NavLink as={Link} to="/app" p={2} >
                    Dashboard

                    </NavLink>

                {user && (<NavLink as={Link} to="logout" p={2}
                    onClick={() => {
                        identity.logout()
                    }} >
                    {` Logout ${user.user_metadata.full_name}`}
                </NavLink>)}

            </Flex>

            <Flex as="form"
                onSubmit={
                    e => {
                        e.preventDefault();
                    /*
                        setTodos([{
                            done: false,
                            value: inputRef.current.value
                        },
                        ...todos
                        ])
                        */
                       dispatch({
                           type: "addTodo",
                           payload: inputRef.current.value

                       })
                        inputRef.current.value = "";
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
                <ul sx={{ listStyleType: 'none' }}  >
                    {
                        todos.map((todo, i) => (
                            <Flex as="li" key={i} 
                            onClick = {
                                ()=>{
                                    dispatch({
                                        type: "toggleTodo",
                                        payload: i
                                    })
                                }
                            }
                            
                            >
                                <Checkbox checked={todo.done} 
                                readOnly
                                />
                                <span>{todo.value}</span>
                            </Flex>
                        ))
                    }
                </ul>


            </Flex>
        </Container>
    )
}

export default Dashboard;