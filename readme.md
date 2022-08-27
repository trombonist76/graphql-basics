# Learning Graphql

### I am learning graphl dynamics, this project a simple challange on graphql.
<br>

## You can start with this command
 `npm run start`


## Open your browser and connect 
### <http://localhost:4000/>
<br>

## Then you can try queries below

```
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