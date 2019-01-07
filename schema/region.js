export default `
  type Region {
    owner: User!
    members: [User!]!
  }

  type Query {
    getRegion(id: Int!): Region!
    allRegion: [Region!]!
  }

  type Mutation {
    createRegion(name: String!): Boolean!
  }
`;