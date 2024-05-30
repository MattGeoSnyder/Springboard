import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getSnacks() {
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }

  //probably should have modified get route to be like post route.
  //Alas it is what it is now.
  static async getDrinks() {
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  //post route to add new drink or snack
  static async addSnack(data, route) {
    const result = await axios.post(`${BASE_API_URL}/${route}`, data={ ...data });
    return result.data;
  } 

}

export default SnackOrBoozeApi;
