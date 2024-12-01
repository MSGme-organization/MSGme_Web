"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

const SocketContext = createContext<ReturnType<typeof io> | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL);
    }
    return () => {
      socket.current?.disconnect();
      socket.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current as any}>
      {children}
    </SocketContext.Provider>
  );
};
