export default `

  type Message {
    id: Int!
    text: String!
    user: User!
    created_at: String!
  }

  type Query {
    allMessages: [Message!]!
  }


  type Mutation {
    createMessage( text: String!): Message!
  }
`;