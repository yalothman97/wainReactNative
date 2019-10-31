import { FETCH_TAGS } from "../actions/actionTypes";
const initialState = {
  tags: [],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false
      };

    default:
      return state;
  }
};
