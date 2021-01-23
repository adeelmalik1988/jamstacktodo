import React, { useContext } from "react"
import { Router} from "@reach/router"
import { IdentityContext } from "../../netlifyIdentityContext";
import { Button, Heading, Flex, Container } from 'theme-ui'
import Dashboard from "./dashboard";

/*

let Dash = () => {
    const { user, identity } = useContext(IdentityContext);
    return (
        <Container>
            <Flex as="nav" >
                <NavLink as={Link} to="/" p={2} >
                    Home

                </NavLink>
                <NavLink as={Link} to="/app" p={2} >
                    Dashboard

                </NavLink>

                {user && (<NavLink as={Link} to="logout" p={2} >
                    {` Logout ${user.user_metadata.full_name}`}
                </NavLink>)}
            </Flex>
         

        </Container>
    )

};

*/
let DashLoggedOut = props => {
    const { identity } = useContext(IdentityContext);
    


    return (
        <Container>


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

export default props => {

    return (
        <Router>

            <Dashboard path='/app' />

            <DashLoggedOut path="/app/logout" />


        </Router>
    )
}