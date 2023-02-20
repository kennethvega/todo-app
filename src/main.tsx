import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider from './context/AuthContext';
import 'tippy.js/dist/tippy.css';
import './styles/global.css';
import { Provider } from 'urql';
import { createClient, dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { TodosQueryResult, TodoType } from './ts/Todos';
import { ADD_TODO } from './graphql/Mutation';

// Helper function for types
export function betterUpdateQuery<Result, Query>(cache: Cache, qi: QueryInput, result: any, fn: (r: Result, q: Query) => Query) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {});
  });
}

const client = createClient({
  url: 'https://todoappv1.onrender.com/query',
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          createTodo: (_result, args, cache, info) => {
            invalidateAllPosts(cache);
          },
        },
      },
    }),
    fetchExchange,
  ],
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);
