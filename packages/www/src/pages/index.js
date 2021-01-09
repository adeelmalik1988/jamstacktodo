import React, { useContext } from 'react'
import { Button, Container, Heading, Flex, NavLink } from 'theme-ui'
import netlifyIdentity from "netlify-identity-widget"
import { Link } from "gatsby"
import {IdentityContext} from "./../../netlifyIdentityContext"

export default props => {

    const { user ,identity } = useContext(IdentityContext)
   

    return (
        <Container>
            <Flex as="nav" >
                <NavLink as={Link} to="/" p={2} >
                    Home

                </NavLink>
                <NavLink as={Link} to="/app" p={2} >
                    Dashboard

                </NavLink>

                { user && (<NavLink p={2} >
                    {user.user_metadata.full_name}
                </NavLink>)}


            </Flex>
            <Flex sx={{
                flexDirection: "column",
                padding: 3
            }} >
                <Heading as='h1' >Todo App</Heading>
                <Button sx={{ marginTop: 2, color: "black" }}
                    onClick={() => { identity.open() }}
                >Login</Button>
            </Flex>
        </Container>
    )
}