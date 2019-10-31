import { FETCH_RESTAURANTS } from "../actions/actionTypes";
const initialState = {
  restaurants: [],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading: false
      };

    default:
      return state;
  }
};
