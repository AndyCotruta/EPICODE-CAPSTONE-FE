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
} from "../redux/reducers/basketSlice";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
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
        <View style={tw.style(`bg-[${mintGreen}] px-4`)}>
          <View style={tw.style("flex-row items-center pb-3")}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? darkGreen : "gray"}
                size={32}
              />
            </TouchableOpacity>
            <Text style={tw.style("px-2")}>
              {items.length > 0 ? items.length : "0"}
            </Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={darkGreen} size={32} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
