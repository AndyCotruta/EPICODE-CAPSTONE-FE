import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initiatedBy: null,
  users: [],
  order: {
    restaurantId: null,
    dishes: [],
    totalPrice: "",
  },
};

export const sharedOrderSlice = createSlice({
  name: "sharedOrder",
  initialState,
  reducers: {
    addInitiatedBy: (state, action) => {
      state.initiatedBy = action.payload;
    },
    addSharedOrderUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    removeSharedOrderUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    addSharedOrderRestaurantId: (state, action) => {
      state.order.restaurantId = action.payload;
    },
    addSharedOrderDishes: (state, action) => {
      state.order.dishes = [...state.order.dishes, action.payload];
    },
    removeSharedOrderDishes: (state, action) => {
      const index = state.order.dishes.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.order.dishes];
      if (index !== -1) {
        newBasket.splice(index, 1);
      } else {
        console.log(`You cannot remove basket with id ${action.payload.id}`);
      }
      state.order.dishes = newBasket;
    },
  },
});

export const {
  addInitiatedBy,
  addSharedOrderUsers,
  removeSharedOrderUser,
  addSharedOrderRestaurantId,
  addSharedOrderDishes,
  removeSharedOrderDishes,
} = sharedOrderSlice.actions;

export const selectInitiatedBy = (state) => state.sharedOrder.initiatedBy;
export const selectSharedOrderUsers = (state) => state.sharedOrder.users;
export const selectSharedOrderDetails = (state) => state.sharedOrder.order;

export const selectSharedOrderRestaurant = (state) =>
  state.sharedOrder.order.restaurantId;
export const selectSharedOrderDishes = (state) =>
  state.sharedOrder.order.dishes;
export const selectSharedOrderDishesWithId = (state, id) =>
  state.sharedOrder.order.dishes.filter((dish) => dish.id === id);
export const selectSharedOrderTotal = (state) =>
  state.sharedOrder.order.dishes.reduce(
    (total, item) => (total += item.price),
    0
  );

export default sharedOrderSlice.reducer;
