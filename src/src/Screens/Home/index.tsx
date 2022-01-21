import React from "react";
import { Link } from "react-router-dom";

import { gql, useQuery, useSubscription } from "@apollo/client";

const getSettings = gql`
  query getTenantSettings($tenant: String!) {
    getTenantSettings(tenant: $tenant)
  }
`;

const getMessage = gql`
  subscription onMessageSent($receiver: String!) {
    onMessageSent(receiver: $receiver) {
      id
      message
      name
    }
  }
`;

export const HomeScreen = () => {
  const { loading, data } = useSubscription(getMessage, {
    variables: {
      receiver: "ebaqeri@communere.com"
    },
    onSubscriptionData: (data) => console.log(data)
  });

  return (
    <div>
      <h1>Home Screen</h1>
      <Link to="message">Message</Link>

      {loading && <p>loading...</p>}
      {data && JSON.stringify(data)}
    </div>
  );
};
