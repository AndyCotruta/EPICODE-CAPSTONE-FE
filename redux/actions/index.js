import { BE_URL, SPOONACULAR_KEY, RAPID_API_SPOONACULAR } from "@env";
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
  addRecipeNutrition,
  addRecipesByIngredients,
} from "../reducers/recipeSlice";
import { setRestaurant } from "../reducers/restaurantSlice";
import { setFeaturedCategories } from "../reducers/allRestaurantsSlice";

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
        dispatch(fetchMyData(token));
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
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${type}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPID_API_SPOONACULAR,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
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
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPID_API_SPOONACULAR,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        dispatch(addActiveRecipe(data));
      } else {
        console.log("Error fetching complete recipe");
      }
    } catch (error) {
      console.log("Error fetching recipe by id: ", error);
    }
  };
};

export const fetchRecipeCalories = (recipeId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/nutritionWidget.json`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPID_API_SPOONACULAR,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addRecipeNutrition(data));
      } else {
        console.log("Error fetching recipe calories");
      }
    } catch (error) {
      console.log("Error fetching recipe calories by id: ", error);
    }
  };
};

export const fetchRecipeByIngredients = (ingredients) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPID_API_SPOONACULAR,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addRecipesByIngredients(data));
      } else {
        console.log("Error fetching recipe by ingredients");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchFeaturedCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BE_URL}/featuredCategories`);
      if (response) {
        const data = await response.json();

        dispatch(setFeaturedCategories(data));
        const allRestaurants = data.flatMap((category) => category.restaurants);

        dispatch(setAllRestaurants(allRestaurants));
      } else {
        console.log("Error fetching featured categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
