import { FETCH_RESTAURANTS } from "../actions/actionTypes";
const initialState = {
  restaurants: [
    {
      id: 1,
      name: "Tatami"
    }
  ],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RESTAURANTS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
