import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../redux/reducers/restaurantSlice";
import { selectBasketItems } from "../redux/reducers/basketSlice";
import {
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { ChevronRightIcon, StarIcon } from "react-native-heroicons/solid";

const SharedBasket = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      lon,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView style={tw.style(`bg-[${lightBeige}]`)}>
        <View style={tw.style("flex-row items-center")}>
          <Text
            style={tw.style(
              `flex-1 text-center text-3xl text-[${darkGreen}] font-bold my-4`
            )}
          >
            Shared Basket
          </Text>
          <TouchableOpacity
            style={tw.style("absolute right-0")}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <XCircleIcon color={darkGreen} size={50} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={tw.style(
              `flex-1 text-center text-base text-gray-400 font-bold my-4`
            )}
          >
            {title}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SharedBasket;
