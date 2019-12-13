import React from 'react';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:2000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BookList></BookList>
      </div>
    </ApolloProvider>
  );
}

export default App;
