import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

const schema = buildSchema(`
type Query {
  message: String
}
`);

const root = {
  message: () => 'First message',
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => console.log('Running server on port 3000'));
