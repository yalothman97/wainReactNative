import { CREATE_ROOM, JOIN_ROOM } from "../actions/actionTypes";

const initialState = {
  socket: null,
  roomName: ""
};

export default (state = initialState, { type, payload, roomName }) => {
  switch (type) {
    case CREATE_ROOM:
      return {
        ...state,
        socket: payload,
        roomName: roomName
      };
    // case JOIN_ROOM:
    //   state.socket.emit("join", {
    //     id: payload,
    //     name: "Naser"
    //   });
    //   return {
    //     ...state,
    //     roomName: payload
    //   };
    default:
      return state;
  }
};
