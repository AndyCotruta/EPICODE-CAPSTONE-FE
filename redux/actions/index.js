import { BE_URL, SPOONACULAR_KEY } from "@env";
import {
  addMySharedDishes,
  addUserData,
  resetMySharedDishes,
  selectAccessToken,
  selectUserData,
} from "../reducers/userSlice";
import {
  addBreakfast,
  addLunch,
  addDinner,
  setRecipeActive,
  addActiveRecipe,
} from "../reducers/recipeSlice";
import { setRestaurant } from "../reducers/restaurantSlice";

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

export const addDailyFood = (token, dailyFood) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BE_URL}/users/me/dailyFood`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dailyFood),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(resetMySharedDishes([]));
      } else {
        console.log("Error posting new daily food");
      }
    } catch (error) {
      console.log("Error while posting new daily food", error);
    }
  };
};

export const moveToHistory = (token, order) => {
  return async (dispatch) => {
    try {
      console.log("We are getting here: moveToHistory");
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

export const moveSharedOrderToHistory = (token, body) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BE_URL}/users/me/sharedOrderHistory`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchMyData(token));
        dispatch(
          setRestaurant({
            id: null,
            imgUrl: null,
            title: null,
            rating: null,
            genre: null,
            address: null,
            short_description: null,
            dishes: null,
          })
        );
      } else {
        console.log("Error fetching order history");
      }
    } catch (error) {
      console.log("Error moving shared order to history: ", error);
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

export const fetchCompleteRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${SPOONACULAR_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addActiveRecipe(data));
      } else {
        console.log("Error fetching complete recipe");
      }
    } catch (error) {
      console.log("Error fetching recipe by id: ", error);
    }
  };
};
