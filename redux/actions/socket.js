import socketIOClient from "socket.io-client";
import { CREATE_ROOM, SET_ADMIN, SET_NICKNAME } from "./actionTypes";

export const joinRoom = (roomName, nickname) => {
  const socket = socketIOClient("https://wain-nodejs.herokuapp.com/");
  socket.emit("join", {
    id: roomName,
    name: nickname
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

export const setNickname = nickname => {
  return {
    type: SET_NICKNAME,
    payload: nickname
  };
};
