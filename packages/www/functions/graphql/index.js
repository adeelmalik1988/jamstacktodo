const { ApolloServer, gql } = require('apollo-server-lambda')

//construct schema, using Graphql schema language
const typeDefs = gql`
    type Query {
        hello: String

 }
`;
//Provide resolver function for your schema fields
const resolvers = {
    Query: {
        hello: ()=> "Hello World",
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
