import { FETCH_TAGS } from "./actionTypes";
import instance from "./instance";

export const fetchTags = () => {
  return async dispatch => {
    try {
      let res = await instance.get("tags/");
      let tags = res.data;
      dispatch({
        type: FETCH_TAGS,
        payload: tags
      });
    } catch (error) {
      // console.error(error.response);
    }
  };
};
