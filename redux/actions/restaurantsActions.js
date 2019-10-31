import { FETCH_RESTAURANTS } from "./actionTypes";
import instance from "./instance";

export const fetchRestaurants = () => {
  return async dispatch => {
    try {
      let res = await instance.get("restaurants/");
      let restaurants = res.data;
      console.log("fetched rests", restaurants);
      dispatch({
        type: FETCH_RESTAURANTS,
        payload: restaurants
      });
    } catch (error) {
      // console.error(error.response);
    }
  };
};
