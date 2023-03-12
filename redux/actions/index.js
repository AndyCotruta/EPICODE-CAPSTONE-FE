import { BE_URL } from "@env";
import { addUserData } from "../reducers/userSlice";

export const fetchMyData = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BE_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const data = await response.json();

        dispatch(addUserData(data));
      } else {
        console.log("Error fetching my data");
      }
    } catch (error) {
      console.log("Error fetching my data: ", error);
    }
  };
};

export const moveToHistory = (token, order) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BE_URL}/users/me/orderHistory`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addUserData(data));
      } else {
        console.log("Error fetching order history");
      }
    } catch (error) {
      console.log("Error moving order to history: ", error);
    }
  };
};
