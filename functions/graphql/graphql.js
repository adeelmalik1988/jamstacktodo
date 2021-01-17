const { ApolloServer, gql } = require('apollo-server-lambda')

//construct schema, using Graphql schema language
const typeDefs = gql`
    type Query {
        todos: [Todo]!
        }
    type Todo {
         id: ID!
        text: String!
        done: Boolean!
        }

    type Mutation {
        addTodo(text: String!): Todo
        updateTodoDone(id: ID!): Todo 
    }
`;

const todos = {};
let todoIndex = 0;

//Provide resolver function for your schema fields
const resolvers = {
    Query: {
        todos: ()=> Object.values(todos),
    },
    Mutation: {
        addTodo: (_, { text } ) => {
            todoIndex++;
            const id = `key-${todoIndex}`;
            todos[id] = { id, text, done: false }
            return todos[id]

        },
        updateTodoDone: (_, { id } ) => {

            todos[id].done = true;
            return todos[id]
        }
    } 
}

const server = new ApolloServer({
    typeDefs,
    resolvers,

    playground: true,
    introspection: true
})


exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true

    }
});