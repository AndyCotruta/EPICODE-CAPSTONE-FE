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

const DishRow = ({
  id,
  name,
  description,
  price,
  image,
  restaurantId,
  shared,
}) => {
  const [alert, setAlert] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const sharedOrderItems = useSelector((state) =>
    selectSharedOrderDishesWithId(state, id)
  );

  const basketRestaurant = useSelector(selectBasketRestaurant);
  const sharedOrderRestaurant = useSelector(selectSharedOrderRestaurant);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    if (basketRestaurant === null) {
      dispatch(addRestautantId({ restaurantId }));
      dispatch(addToBasket({ id, name, description, price, image }));
    } else if (
      basketRestaurant !== null &&
      restaurantId === basketRestaurant.restaurantId
    ) {
      dispatch(addRestautantId({ restaurantId }));
      dispatch(addToBasket({ id, name, description, price, image }));
    } else {
      setAlert(!alert);
    }
  };

  const addItemToSharedBasket = () => {
    if (sharedOrderRestaurant === null) {
      dispatch(addSharedOrderRestaurantId({ restaurantId }));
      dispatch(addSharedOrderDishes({ id, name, description, price, image }));
    } else if (
      sharedOrderRestaurant !== null &&
      restaurantId === sharedOrderRestaurant.restaurantId
    ) {
      dispatch(addSharedOrderRestaurantId({ restaurantId }));
      dispatch(addSharedOrderDishes({ id, name, description, price, image }));
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
      dispatch(removeSharedOrderDishes({ id }));
      dispatch(addSharedOrderRestaurantId(null));
    } else {
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
          `bg-[${lightBeige}] border-t p-4 border-[${mintGreen}] ${
            isPressed && "border-b-0"
          }`
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
