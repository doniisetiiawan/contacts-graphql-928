import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { contacts } from './data/contacts';

const app = express();

const schema = buildSchema(`
type Query {
  contact(id: Int!): Contact
  contacts(name: String): [Contact]
}

type Mutation {
  updateContact(
    id: Int!,
    name: String!,
    phone: String!,
    email: String!
): Contact
}

type Contact {
  id: Int
  name: String
  phone: String
  email: String
}
`);

const methods = {
  getContact: (args) => {
    const { id } = args;

    return contacts.filter(contact => contact.id === id)[0];
  },
  getContacts: (args) => {
    const { name = false } = args;

    if (!name) {
      return contacts;
    }

    return contacts.filter(
      contact => contact.name.includes(name),
    );
  },
  updateContact: ({
    id, name, phone, email,
  }) => {
    contacts.forEach((contact) => {
      if (contact.id === id) {
        contact.name = name || contact.name;
        contact.phone = phone || contact.phone;
        contact.email = email || contact.email;
      }
    });

    return contacts.filter(contact => contact.id === id)[0];
  },
};

const root = {
  contact: methods.getContact,
  contacts: methods.getContacts,
  updateContact: methods.updateContact,
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => console.log('Running server on port 3000'));
