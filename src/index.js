import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { ApolloEngine } from 'apollo-engine';

// Models
import Car from './models/Car';

// Schema
import typeDefs from './schema';
import resolvers from './resolvers';

// Init express
const app = express();

// MongoDB
mongoose.connect('mongodb://localhost/graphql-test', {
        useNewUrlParser: true
    }).then(() => console.log('BD connected!'))
    .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);
const ENGINE_API_KEY = 'service:ecortezr-1665:FBjq1MdwEHCRhqdyF_y2Zw';

// Schema - old version 1.4.0
/*
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
*/

// Schema - Apollo 2.1
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Car
    },
    tracing: true,
    cacheControl: true,
    playground: {
        endpoint: `http://localhost:${app.get('port')}/graphql`,
        settings: {
            "editor.theme": "dark"
        }
    }
});

// Middlewares
app.use(compression());
// Apollo integration with express
apolloServer.applyMiddleware({ app });

// Apollo engine (new version)
const engine = new ApolloEngine({
    apiKey: ENGINE_API_KEY
});

// Routes Apollo 1.4.0
/*
app.use('/graphql', express.json(), graphqlExpress({
    schema,
    context: {
        Car
    }
}));
*/

// Start Graphql (with express) server
engine.listen({
    port: app.get('port'),
    graphqlPaths: ['/graphql'],
    expressApp: app,
    launcherOptions: {
        startupTimeout: 3000,
    },
}, () => {
    console.log(
        "🚀", " GraphQL Server (using express) on port", app.get('port')
    );
});

// standard version (express)
/*
app.listen(app.get('port'), () => {
    console.log("GraphQL Server (using express) on port", app.get('port'));
});
*/