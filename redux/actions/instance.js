import axios from "axios";
const instance = axios.create({
  baseURL: "http://104.248.34.189/"
});
export default instance;
