import { gql, useMutation } from "@apollo/client";
import React from "react";

const sendMessage = gql`
  mutation sendMessage($message: MessageInput!) {
    sendMessage(message: $message)
  }
`;

export const MessageScreen = () => {
  const [sendMessageMutation] = useMutation(sendMessage, {
    variables: {
      message: {
        content: "this is a message",
        receiverUsername: "ebaqeri@communere.com"
      }
    },
    onCompleted: (data) => console.table(data)
  });

  return (
    <div>
      <h1>Send Message</h1>
      <button onClick={() => sendMessageMutation()}>send message</button>
    </div>
  );
};
