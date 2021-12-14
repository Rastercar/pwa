import { gql } from 'apollo-server';

export default gql`
  type Painter {
    name: String!
    country: String!
    techniques: [String]!
  }

  type Painting {
    author: String!
    title: String!
    technique: String!
    date: String!
  }

  input PainterInput {
    name: String!
    country: String!
    techniques: [String]!
  }

  input PaintingInput {
    author: String!
    title: String!
    technique: String!
    date: String!
  }

  type Query {
    painters: [Painter]!
    paintings: [Painting]!
    painter(name: String): Painter
    painting(title: String): Painting
  }

  type Mutation {
    createPainter(input: PainterInput!): Painter!
    createPainting(input: PaintingInput!): Painting!
  }
`;
