import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/reducers/basketSlice";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import {
  selectSharedOrderDishes,
  selectSharedOrderTotal,
} from "../redux/reducers/sharedOrderSlice";

const BasketIcon = ({ shared }) => {
  const navigation = useNavigation();

  const items = useSelector(selectBasketItems);
  const sharedOrderItems = useSelector(selectSharedOrderDishes);

  const basketTotal = useSelector(selectBasketTotal);
  const sharedOrderTotal = useSelector(selectSharedOrderTotal);

  if (shared === true) {
    if (sharedOrderItems.length === 0) {
      return null;
    }
  } else if (items.length === 0) return null;

  return (
    <View style={tw.style("absolute bottom-6 w-full z-50")}>
      <TouchableOpacity
        onPress={
          shared
            ? () => {
                navigation.navigate("Basket", { shared: true });
              }
            : () => navigation.navigate("Basket")
        }
        style={tw.style(
          `mx-5 bg-[${lightOrange}] p-4 rounded-lg flex-row items-center`
        )}
      >
        <Text
          style={tw.style(
            `text-white font-extrabold text-lg rounded-lg bg-[${darkOrange}] py-1 px-2`
          )}
        >
          {shared ? sharedOrderItems.length : items.length}
        </Text>
        <Text
          style={tw.style(
            "flex-1 text-white font-extrabold text-lg text-center"
          )}
        >
          View Basket
        </Text>
        <Text style={tw.style("text-lg text-white font-extrabold")}>
          ${shared ? sharedOrderTotal : basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
