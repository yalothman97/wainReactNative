import socketIOClient from "socket.io-client";
import { CREATE_ROOM, JOIN_ROOM, SET_ADMIN } from "./actionTypes";

export const createRoom = roomName => {
  const socket = socketIOClient("https://192.168.100.232");
  socket.emit("start", {
    id: roomName,
    name: "Naser"
  });

  return {
    type: CREATE_ROOM,
    payload: socket,
    roomName: roomName
  };
};

export const joinRoom = roomName => {
  const socket = socketIOClient("http://192.168.100.232");
  socket.emit("join", {
    id: roomName,
    name: "Naser"
  });

  return {
    type: CREATE_ROOM,
    payload: socket,
    roomName: roomName
  };
};
export const setAdmin = () => {
  return {
    type: SET_ADMIN
  };
};
