# Learning Graphql

### I am learning graphl dynamics, this project a simple challange on graphql.
<br>

## You can start with this command
 `npm run start`


## Open your browser and connect 
### <http://localhost:4000/>
<br>


## **Challange 1** Then you can try queries below

### **In this challange, I learned how to write query and work with relational data.**
<br>

```perl
query getUsers {
  users {
    id
    events {
      title
      desc
      date
    }
  }
}

query getEvents {
  events {
    id
    title
    date
    user{username}
    location{name}
    participants{user{username}}
  }
}

query getParticipants {
  participants {
    id
    user{
      username
    }
    event{
      title
    }
  }
}

query getLocations {
  locations {
    id
    name
    events{
      title
    }
  }
}

query getUser {
  user(id: 1) {
    id
    username
    events {
      title
      date
      location{
        name
      }
    }
  }
}

query getEvent {
  event(id: 2) {
    title
    desc
    date
    location_id
    user_id
  }
}

query getParticipant{
  participant(id:3){
    user{username}
  }
}

query getLocation{
  location(id:3){
    name
    events{title}
  }
}
```

## **Challange 2** You can try queries below

### **In this challange, I learned CRUD operations on graphql.**
<br>

```perl
mutation createUser{
  createUser(data:{
    username: "John"
    email:"asd@fgh.com"
  })
  {
    id
    username
    email
    events{title}
  }
}

mutation createEvent{
  createEvent(data:{
    title: "Create Event Mutation"
    desc: "New event"
    date: "2022-27-08",
    from: "11:00",
    to: "12:00",
    location_id: 1,
    user_id: 1

    })
  {
    id
    title
    desc
    date
    from
    to
    location_id
    user{
      username
    }
    location{
      name
    }
    participants{
      user{
        username
      }
    }
    
  }
}

mutation createLocation{
  createLocation(data:{
    name: "Create Location Mutation"
    desc: "New Location"
    lat: 55
    lng: -160

  })
  {
    id
    name
    desc
    events{title}
  }
}

mutation createParticipant {
  createParticipant(data:{
    user_id: 1
    event_id: 2
  })
  {
    id
    user{username}
    event{title}
  }
}

mutation updateUser{
  updateUser(
    id:2
    data:{
      username: "Dali"
    }
  )
  {
    id	
  	username
    email
    events{title}
  }
}

mutation updateEvent{
  updateEvent(
    id:2
    data:{
    title:"Event Updated"
    }
  )
  {
    id
    title
    desc
    date
    from
    to
    location_id
    user{
      username
    }
    location{
      name
    }
    participants{
      user{
        username
      }
    }
    
  }
}

mutation updateLocation{
  updateLocation(
    id:2
    data:{
      name: "North Lake"
    }
  )
  {
    id	
    name
    desc
    events{title}
  }
}

mutation updateParticipant{
  updateParticipant(
    id:4
    data:{
      event_id: 5
    }
  )
  {
    id
    user{username}
    event_id
    event{title}
  }
}

mutation deleteUser{
  deleteUser(id:2)
  {
    id
    username
  }
}

mutation deleteEvent{
  deleteEvent(
    id:2
  )
  {
    id
    title
    desc
    date
    from
    to
    location_id
    user{
      username
    }
    location{
      name
    }
    participants{
      user{
        username
      }
    }
    
  }
}

mutation deleteLocation{
  deleteLocation(
    id:2
  )
  {
    id	
    name
    desc
    events{title}
  }
}

mutation deleteParticipant{
  deleteParticipant(
    id:4
  )
  {
    id
    user{username}
    event_id
    event{title}
  }
}

mutation deleteAllUsers{
  deleteAllUsers{count}
}

mutation deleteAllEvents{
  deleteAllEvents{count}
}

mutation deleteAllLocations{
  deleteAllLocations{count}
}

mutation deleteAllParticipants{
  deleteAllParticipants{count}
}
```

## **Challange 3** You can try queries below

### **In this challange, I learned SUBSCRIPTIONS on graphql.**
### Subscription is a WebSocket-based structure where we can be informed about the events (add, delete, update, etc.) in real time.
#### **NOTE: For listen real-time events you must run subscription before updating any state. Otherwise you can't listen any event.**
<br>

```perl
subscription UserCreated {
  userCreated {
    id
    username
    email
  }
}

subscription EventCreated {
  eventCreated{
    id
    user {
      username
    }
    title
		location{
      name
    }
    
  }
}

subscription ParticipantAdded {
  participantAdded{
    id
    user {
      username
    }
    event{title}
    
  }
}
```