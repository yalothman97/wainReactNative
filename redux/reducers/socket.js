import { CREATE_ROOM, JOIN_ROOM, SET_ADMIN } from "../actions/actionTypes";

const initialState = {
  socket: null,
  roomName: "",
  admin: false
};

export default (state = initialState, { type, payload, roomName }) => {
  switch (type) {
    case CREATE_ROOM:
      return {
        ...state,
        socket: payload,
        roomName: roomName
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: true
      };
    default:
      return state;
  }
};
