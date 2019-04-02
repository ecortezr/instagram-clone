import { gql } from 'apollo-server-express';

export default gql `

    type User {
        _id: ID!
        username: String!
        password: String!
    }

    type Query {
        allUsers: [User!]! @cacheControl(maxAge: 60)
        getUser(_id: ID!): User!
    }

    type Mutation {
        createUser(username: String!, password: String!): User!
    }

`;