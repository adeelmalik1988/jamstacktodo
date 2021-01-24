//export { wrapRootElement } from './wrap-root-element'
/*
const React = require("react");
const wrapRootElement = require("./wrap-root-element");


exports.wrapRootElement = wrapRootElement;
*/



/*
const React = require("react");
const wrapRootElement = require("./wrap-root-element")
const client = require("./gatsby-browser")
const ApolloProvider = require("@apollo/client")
 
//exports.wrapRootElement = wrapRootElement;

exports.wrapRootElement = ({element})=>{
    return (
        <ApolloProvider client={client} >
            {wrapRootElement({element})}
        </ApolloProvider>
    )

};
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
const netlifyIdentity = require("netlify-identity-widget")
const { setContext } =  require("apollo-link-context")



exports.wrapRootElement = ({ element }) => {

    const httpLink = new HttpLink({
        uri: "https://jamstacktodo-adeelmalik.netlify.app/.netlify/functions/graphql",
        fetch
    })

    const authLink = setContext((_, { headers }) => {
        const user =  netlifyIdentity.currentUser()
        const token =  user.token.access_token
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : ""

            }
        }
    })


    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    })


    return (
        <ApolloProvider client={client} >
            {wrapRootElement({ element })}
        </ApolloProvider>
    )

};



