import "./utils/polyyfill";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./src";

import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { ApolloLink } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "@apollo/client";

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWU5OTRmYzA5ZWIyNDI2MmE3MmY4NWIiLCJ1c2VyRW1haWwiOiJlYmFxZXJpQGNvbW11bmVyZS5jb20iLCJpYXQiOjE2NDI3NzM3NDV9.Ot2ZlkSumAMzwC-mCjqdLBF6ANsJjxyvvBBnTC3wzY8"
    }
  };
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4001/graphql",
  options: {
    connectionParams: async () => {
      return {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWU5OTRmYzA5ZWIyNDI2MmE3MmY4NWIiLCJ1c2VyRW1haWwiOiJlYmFxZXJpQGNvbW11bmVyZS5jb20iLCJpYXQiOjE2NDI3NzM3NDV9.Ot2ZlkSumAMzwC-mCjqdLBF6ANsJjxyvvBBnTC3wzY8"
      };
    },
    reconnect: true
  }
});
const uploadLink = createUploadLink({ uri: "http://localhost:4001/graphql" });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink as unknown as ApolloLink,
  ApolloLink.from([authLink, uploadLink])
);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({ addTypename: false })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
