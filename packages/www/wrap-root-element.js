//import { ApolloClient, ApolloProvider } from '@apollo/client'

const React = require('react')
const { ThemeProvider } = require('theme-ui')
const { deep } = require('@theme-ui/presets')
const { Provider } = require("./netlifyIdentityContext")
//import { wrapRootElement } from './gatsby-ssr'
/*
import {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache
} from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://jamstacktodo-adeelmalik.netlify.app/.netlify/functions/graphql",
    })
})

*/

const newTheme = {
    ...deep,
    sizes: {
        container: 1024
    }
}

/*
export const wrapRootElement = ({ element }) => (

    <Provider>
        <ApolloProvider client={client} >
            <ThemeProvider theme={newTheme} >{element} </ThemeProvider>
        </ApolloProvider>
    </Provider>
);
*/

module.exports = ({ element }) => (
    <Provider>
        <ThemeProvider theme={newTheme} >{element} </ThemeProvider>
    </Provider>
);