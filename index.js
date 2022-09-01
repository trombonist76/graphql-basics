const { createServer, createPubSub } = require('@graphql-yoga/node');
const { nanoid } = require('nanoid');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
const pubSub = createPubSub()

const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event]!
  }

  input UserData{
    username: String!
    email: String!
  }

  input UpdateUser{
    username: String
    email: String
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

  input EventData{
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input UpdateEvent{
    title: String
    desc: String
    from: String
    to: String
    date: String
    location_id: ID
    user_id: ID
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
    events:[Event]!
  }

  input LocationData{
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }  

  input UpdateLocation{
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }

  input ParticipantData{
    user_id: ID!
    event_id: ID!
  }
  
  input UpdateParticipant{
    user_id: ID
    event_id: ID
  }

  type DeleteAllRecords{
    count: Int!
  }

  type Mutation {
    createUser(data:UserData!): User!
    createEvent(data:EventData!): Event!
    createLocation(data:LocationData!): Location!
    createParticipant(data:ParticipantData!): Participant!

    updateUser(id:ID!, data:UpdateUser!): User!
    updateEvent(id:ID!, data:UpdateEvent!): Event!
    updateLocation(id:ID!, data:UpdateLocation!): Location!
    updateParticipant(id:ID!, data:UpdateParticipant!): Participant!

    deleteUser(id:ID!): User!
    deleteEvent(id:ID!): Event!
    deleteLocation(id:ID!): Location!
    deleteParticipant(id:ID!): Participant!

    deleteAllUsers: DeleteAllRecords
    deleteAllEvents: DeleteAllRecords
    deleteAllLocations: DeleteAllRecords
    deleteAllParticipants: DeleteAllRecords
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

  type Subscription {
    userCreated: User!
    eventCreated: Event!
    participantAdded: Participant!
  }

`;

const {users,locations,events,participants} = require("./data.json")


const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (_,__, {pubSub}) => pubSub.subscribe("userCreated"),
      resolve: (payload) => payload,
    },

    eventCreated: {
      subscribe: (_,__, {pubSub}) => pubSub.subscribe("eventCreated"),
      resolve: (payload) => payload,
    },

    participantAdded: {
      subscribe: (_,__, {pubSub}) => pubSub.subscribe("participantAdded"),
      resolve: (payload) => payload,
    },
  },

  Mutation: {
    createUser: (parent,{data}, {pubSub}) => {
      const user = {
        id: nanoid(),
        ...data
      }

      users.push(user)
      pubSub.publish("userCreated",user)
      return user
    },

    createEvent: (parent,{data}, {pubSub}) => {
      const event = {
        id: nanoid(),
        ...data
      }
      events.push(event)
      pubSub.publish("eventCreated",event)
      return event
    },

    createLocation: (parent,{data}) => {
      const location = {
        id: nanoid(),
        ...data
      }
      locations.push(location)
      return location
    },

    createParticipant: (parent,{data}) => {
      const participant = {
        id: nanoid(),
        ...data
      }
      participants.push(participant)
      pubSub.publish("participantAdded",participant)
      return participant
    },

    updateUser: (parent, {id,data}) => {
      const userIndex = users.findIndex(user=> user.id.toString() === id)
      if(userIndex === -1){
        throw new Error("User not found")
      }
      const user = {...users[userIndex], ...data}
      users[userIndex] = user

      return user
    },

    updateEvent: (parent, {id,data}) => {
      const eventIndex = events.findIndex(event=> event.id.toString() === id)
      if(eventIndex === -1){
        throw new Error("Event not found")
      }
      const event = {...events[eventIndex], ...data}
      events[eventIndex] = event

      return event
    },
    
    updateLocation: (parent, {id,data}) => {
      const locationIndex = locations.findIndex(location=> location.id.toString() === id)
      if(locationIndex === -1){
        throw new Error("Location not found")
      }
      const location = {...locations[locationIndex], ...data}
      locations[locationIndex] = location

      return location
    },

    updateParticipant: (parent, {id,data}) => {
      const participantIndex = participants.findIndex(participant=> participant.id.toString() === id)
      if(participantIndex === -1){
        throw new Error("Participant not found")
      }
      const participant = {...participants[participantIndex], ...data}
      participants[participantIndex] = participant

      return participant
    },

    deleteUser: (parent, {id}) => {
      const userIndex = users.findIndex(user=>user.id.toString() === id)

      if(userIndex === -1){
        throw new Error("User Not Found")
      }
      const user = users[userIndex]
      users.splice(userIndex,1)
      return user
    },

    deleteEvent: (parent, {id}) => {
      const eventIndex = events.findIndex(event=>event.id.toString() === id)

      if(eventIndex === -1){
        throw new Error("Event Not Found")
      }
      const event = events[eventIndex]
      events.splice(eventIndex,1)
      return event
    },

    deleteLocation: (parent, {id}) => {
      const locationIndex = locations.findIndex(location=>location.id.toString() === id)

      if(locationIndex === -1){
        throw new Error("Location Not Found")
      }
      const location = locations[locationIndex]
      locations.splice(locationIndex,1)
      return location
    },

    deleteParticipant: (parent, {id}) => {
      const participantIndex = participants.findIndex(participant=>participant.id.toString() === id)

      if(participantIndex === -1){
        throw new Error("Participant Not Found")
      }
      const participant = participants[participantIndex]
      participants.splice(participantIndex,1)
      return participant
    },

    deleteAllUsers: () => {
      const totalCount = users.length
      users.length = 0
      return {count:totalCount}
    },

    deleteAllEvents: () => {
      const totalCount = events.length
      events.length = 0
      return {count:totalCount}
    },

    deleteAllLocations: () => {
      const totalCount = locations.length
      locations.length = 0
      return {count:totalCount}
    },

    deleteAllParticipants: () => {
      const totalCount = participants.length
      participants.length = 0
      return {count:totalCount}
    }
  },

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
    events: (parent,args) => events.filter(event=>event.user_id.toString() === parent.id.toString())
  },

  Event: {
    user: (parent,args) => users.find(user=>user.id.toString() === parent.user_id.toString()),
    location: (parent,args) => locations.find(location=>location.id.toString() === parent.location_id.toString()),
    participants: (parent,args) => participants.filter(participant=>participant.event_id.toString() === parent.id.toString())
  },

  Location: {
    events: (parent,args) => events.filter(event=>event.location_id.toString() === parent.id.toString())
  },

  Participant: {
    user: (parent,args) => users.find(user=>user.id.toString() === parent.user_id.toString()),
    event: (parent,args) => events.find(event=>event.id.toString() === parent.event_id.toString())
  }
};


const server = new createServer({
  schema:{
    typeDefs,
    resolvers
  },
  context:{
    pubSub
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({}),
  ],
});

server.start();