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
            {wrapRootElement({ element })}
        </ApolloProvider>
    )

};



