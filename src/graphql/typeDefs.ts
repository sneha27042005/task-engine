export const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    createdAt: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
    health: String!
  }

  type Mutation {
    createTask(title: String!, description: String!): Task!
    updateTaskStatus(id: ID!, status: String!): Task
  }
`;