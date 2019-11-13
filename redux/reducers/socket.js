import { CREATE_ROOM, SET_ADMIN, SET_NICKNAME } from "../actions/actionTypes";

const initialState = {
  socket: null,
  roomName: "",
  admin: false,
  nickname: ""
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
    case SET_NICKNAME:
      return {
        ...state,
        nickname: payload
      };
    default:
      return state;
  }
};
