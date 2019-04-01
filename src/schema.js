import { gql } from 'apollo-server-express';

export default gql `

    type Car {
        _id: String!
        name: String
    }

    type Query {
        allCars: [Car!]! @cacheControl(maxAge: 60)
    }

    type Mutation {
        createCar(name: String!): Car!
    }

`;