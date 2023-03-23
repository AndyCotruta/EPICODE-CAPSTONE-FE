import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
  addRestautantId,
  selectBasketRestaurant,
} from "../redux/reducers/basketSlice";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import {
  addSharedOrderDishes,
  addSharedOrderRestaurantId,
  removeSharedOrderDishes,
  selectSharedOrderDishesWithId,
  selectSharedOrderRestaurant,
} from "../redux/reducers/sharedOrderSlice";
import { io } from "socket.io-client";
import { BE_URL } from "@env";
import {
  addMySharedDishes,
  removeMySharedDishes,
  selectMySharedDishes,
  selectUserData,
} from "../redux/reducers/userSlice";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const DishRow = ({
  id,
  name,
  description,
  price,
  image,
  calories,
  restaurantId,
  shared,
}) => {
  const [alert, setAlert] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const userData = useSelector(selectUserData);
  const userId = userData._id;
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const sharedOrderItems = useSelector((state) =>
    selectSharedOrderDishesWithId(state, id)
  );

  const basketRestaurant = useSelector(selectBasketRestaurant);
  const sharedOrderRestaurant = useSelector(selectSharedOrderRestaurant);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    console.log("Restaurant id is: ", basketRestaurant);
    if (basketRestaurant === null) {
      console.log("This is why we are passing this id: ", restaurantId);
      dispatch(addRestautantId({ restaurantId }));
      dispatch(addToBasket({ id, name, description, price, image }));
    } else if (
      basketRestaurant !== null &&
      restaurantId === basketRestaurant.restaurantId
    ) {
      console.log("This is why we are passing this id: ", restaurantId);
      dispatch(addRestautantId({ restaurantId }));
      dispatch(addToBasket({ id, name, description, price, image }));
    } else {
      setAlert(!alert);
    }
  };

  const addItemToSharedBasket = () => {
    console.log("SharedRestaurant id is: ", sharedOrderRestaurant);
    if (sharedOrderRestaurant === null) {
      console.log("This is why we are passing this id: ", restaurantId);
      dispatch(addSharedOrderRestaurantId({ restaurantId }));
      // dispatch(addSharedOrderDishes({ id, name, description, price, image }));
      const dailyFood = {
        type: "order",
        title: name,
        image: image,
        calories: calories,
      };

      socket.emit("addMyDish", { id, name, description, price, image });
      dispatch(addMySharedDishes(dailyFood));
    } else if (
      sharedOrderRestaurant !== null &&
      restaurantId === sharedOrderRestaurant.restaurantId
    ) {
      console.log("This is why we are passing this id: ", restaurantId);
      const dailyFood = {
        type: "order",
        title: name,
        image: image,
        calories: calories,
      };
      dispatch(addSharedOrderRestaurantId({ restaurantId }));
      // dispatch(addSharedOrderDishes({ id, name, description, price, image }));
      socket.emit("addMyDish", { id, name, description, price, image });
      dispatch(addMySharedDishes(dailyFood));
    } else {
      setAlert(!alert);
    }
  };

  const removeItemFromBasket = () => {
    if (items.length <= 1) {
      dispatch(removeFromBasket({ id }));
      dispatch(addRestautantId(null));
    } else {
      dispatch(removeFromBasket({ id }));
    }
  };

  const removeItemFromSharedBasket = () => {
    if (sharedOrderItems.length <= 1) {
      // dispatch(removeSharedOrderDishes({ id }));
      const dailyFood = {
        type: "order",
        title: name,
        image: image,
        calories: calories,
      };
      dispatch(removeMySharedDishes(dailyFood));
      socket.emit("removeMyDish", { id });
      dispatch(addSharedOrderRestaurantId(null));
    } else {
      const dailyFood = {
        type: "order",
        title: name,
        image: image,
        calories: calories,
      };
      dispatch(removeMySharedDishes(dailyFood));

      dispatch(removeSharedOrderDishes({ id }));
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        style={tw.style(
          `bg-[${lightBeige}] border-t p-4 border-[${mintGreen}] 
          `
        )}
        className="bg-white border p-4 border-gray-200"
      >
        <View style={tw.style("flex-row")} className="flex-row">
          <View style={tw.style("flex-1 pr-2")} className="flex-1 pr-2">
            <Text
              style={tw.style(`text-lg font-bold text-[${darkGreen}] mb-1`)}
              className="text-lg mb-1"
            >
              {name}
            </Text>
            <Text style={tw.style("text-gray-400")} className="text-gray-400">
              {description}
            </Text>
            <Text
              style={tw.style(`text-[${darkOrange}] mt-2`)}
              className="text-gray-400 mt-2"
            >
              {price} $
            </Text>
          </View>
          <View>
            <Image
              style={tw.style("h-20 w-20 bg-gray-300 p-4")}
              className="h-20 w-20 bg-gray-300 p-4"
              source={{ uri: image }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw.style(`bg-[${lightBeige}] px-4`)}>
          <View style={tw.style("flex-row items-center pb-3")}>
            <TouchableOpacity
              disabled={shared ? !sharedOrderItems.length : !items.length}
              onPress={
                shared ? removeItemFromSharedBasket : removeItemFromBasket
              }
            >
              <MinusCircleIcon
                color={
                  shared
                    ? sharedOrderItems.length > 0
                      ? darkGreen
                      : "gray"
                    : items.length > 0
                    ? darkGreen
                    : "gray"
                }
                size={32}
              />
            </TouchableOpacity>
            <Text style={tw.style("px-2")}>
              {shared
                ? sharedOrderItems.length > 0
                  ? sharedOrderItems.length
                  : "0"
                : items.length > 0
                ? items.length
                : "0"}
            </Text>
            <TouchableOpacity
              onPress={shared ? addItemToSharedBasket : addItemToBasket}
            >
              <PlusCircleIcon color={darkGreen} size={32} />
            </TouchableOpacity>
            {alert && (
              <View style={tw.style("flex-1 ")}>
                <Text style={tw.style("text-red-500 text-sm")}>
                  You cannot add dishes from different restaurants to the same
                  basket!
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
