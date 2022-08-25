const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');


const typeDefs = gql`
  type User {
    id: ID!
    username: String
    email: String
    events: [Event]!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user: User!
    location: Location!
    participants:[Participant]!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
    events:[Event]!
  }

  type Participant {
    id: ID!
    user_id: Int!
    event_id: Int!
    user:User!
    event:Event!
  }

  type Query {
    users: [User]
    locations: [Location]
    events: [Event]
    participants: [Participant]
    user(id:ID!): User
    location(id:ID!): Location
    event(id:ID!): Event
    participant(id:ID!): Participant
  }
`;

const {users,locations,events,participants} = require("./data.json")


const resolvers = {
  Query: {
    users: () => users,
    locations: () => locations,
    events: () => events,
    participants: () => participants,

    user: (parent,args) => users.find(user=>user.id.toString() === args.id),
    location: (parent,args) => locations.find(location=>location.id.toString() === args.id),
    event: (parent,args) => events.find(event=>event.id.toString() === args.id),
    participant: (parent,args) => participants.find(participant=>participant.id.toString() === args.id),
  },
  User: {
    events: (parent,args) => events.filter(event=>event.user_id === parent.id)
  },

  Event: {
    user: (parent,args) => users.find(user=>user.id === parent.user_id),
    location: (parent,args) => locations.find(location=>location.id === parent.location_id),
    participants: (parent,args) => participants.filter(participant=>participant.event_id === parent.id)
  },

  Location: {
    events: (parent,args) => events.filter(event=>event.location_id === parent.id)
  },

  Participant: {
    user: (parent,args) => users.find(user=>user.id === parent.user_id),
    event: (parent,args) => events.find(event=>event.id === parent.event_id)
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({}),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});