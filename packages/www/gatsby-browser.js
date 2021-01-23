/*
export { wrapRootElement } from './wrap-root-element'
*/
const React = require("react");
const wrapRootElement = require("./wrap-root-element")
const {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache
} = require("@apollo/client")
const fetch = require("cross-fetch")

/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://jamstacktodo-adeelmalik.netlify.app/.netlify/functions/graphql"
    })
})
*/


exports.wrapRootElement = ({ element }) => {

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "https://jamstacktodo-adeelmalik.netlify.app/.netlify/functions/graphql",
            fetch

        }),
    })



    return (
        <ApolloProvider client={client} >
            { wrapRootElement({ element })}
        </ApolloProvider>
    )

};

