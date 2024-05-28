import React from "react";

const Chats = ({ params }: { params: { id: number } }) => {
  return <div>Chats {params.id}</div>;
};

export default Chats;
