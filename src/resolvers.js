export default {
    Query: {
        allUsers: async(parent, args, { models }) => {
            const users = await models.User.find();

            return users;

            // Cada id de MongoDB es un objeto, así que hay que transformarlos por string
            /* return users.map(user => {
                user._id = user._id.toString;

                return user;
            }); */
        },
        getUser: async(parent, args, { models }) => {
            const user = await models.User.findOne(args);

            return user;
        }
    },

    Mutation: {
        createUser: async(parent, args, { models }) => {
            const user = await new models.User(args).save();
            //user._id = user._id.toString;

            return user;
        }
    }
}