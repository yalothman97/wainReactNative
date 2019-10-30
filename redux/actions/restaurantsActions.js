import { FETCH_RESTAURANTS } from "./actionTypes";
import instance from "./instance";

export const fetchRestaurants = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_RESTAURANTS,
      payload: []
    });
  };
};
