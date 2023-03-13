import { BE_URL, SPOONACULAR_KEY } from "@env";
import { addUserData } from "../reducers/userSlice";
import { addBreakfast, addLunch, addDinner } from "../reducers/recipeSlice";

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
        dispatch(fetchMyData(token));
      } else {
        console.log("Error fetching order history");
      }
    } catch (error) {
      console.log("Error moving order to history: ", error);
    }
  };
};

export const fetchRecipeByType = (type) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${type}&apiKey=${SPOONACULAR_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        if (type === "Breakfast") {
          dispatch(addBreakfast(data.results));
        } else if (type === "Lunch") {
          dispatch(addLunch(data.results));
        } else if (type === "Dinner") {
          dispatch(addDinner(data.results));
        }
      } else {
        console.log("Error fetching recipe by type: ", type);
      }
    } catch (error) {
      console.log("Error fetching recipe by type: ", error);
    }
  };
};
