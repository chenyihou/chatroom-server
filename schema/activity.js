export default `

  type Activity {
    id: Int!
    name: String!
    users: [User!]!
  }

  type Mutation {
    createActivity(teamId: Int!, name: String!): Boolean!
  }
`;