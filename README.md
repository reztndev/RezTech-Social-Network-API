# NoSQL: Social Network API

## Summary
In this challenge, we'll build a set of APIs for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This application will use Express.js for routing, a MongoDB database, and the Mongoose ODM. The application will also use a JavaScript 'Date' object to format timestamps in an easy to read format.

## Technologies
The following is the list of technologies used to implement this application:
1. Express.js for building and supporting the API routes and handling the APIs request and responses

2. MongoDB as a NoSQL and object-oriented database for building the social network data models 

3. Mongoose as an Object Data Modeling (ODM) library for creating the schemas for the application's data models

4. Moment.js library for formatting timestamps

## Application Execution
This application does not include a frontend and therefore will not be deployed.  Instead, all API functionality supporting the creation of a social network will have to be invoked and tested using a tool such as Insomnia.

The implemented routes will be tested for CRUD operatons for creating, reading, updating and deletng the (users), (thoughts) and (friends of users) that serve as the central data models supporting the social network.

A walkthrough video demonstrating the functionality of the application (e.g. execution of APIs using the tool Insomnia) will be provided at the end of this README.

## Bonus Feature
The following bonus feature has also been implmeneted:
* When a user's is deleted, the thoughts associated with that user are also deleted

## Application Architecture
The following is the outline fo the application architecture, including the data models and routes for implementing the API functionality:

### Models

**User**:

* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**:

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

---

**Thought**:

* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

**Schema Settings**:

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

---

**Reaction** (SCHEMA ONLY)

* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId

* `reactionBody`
  * String
  * Required
  * 280 character maximum

* `username`
  * String
  * Required

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

**Schema Settings**:

This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

### API Routes

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Link to the walkthrough video
Use this link to view the recorded video demonstrating the exectuion of APIs that have been implmeneted to support this socail network application: 