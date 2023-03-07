import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={tw.style(`bg-[${mintGreen}] h-full w-64 mr-4`)}
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        style={tw.style("h-36 w-64 rounded-sm")}
        source={{
          uri: imgUrl,
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View
        style={tw.style("pb-3 h-32 flex-col justify-between")}
        className="px-3 pb-4 "
      >
        <Text
          style={tw.style(`px-2 font-bold text-[${darkGreen}] text-lg pt-2`)}
          className="font-bold text-lg pt-2"
        >
          {title}
        </Text>
        <View
          style={tw.style("flex-row items-center px-2 pb-1")}
          className="flex-row items-center space-x-1"
        >
          <StarIcon color="green" opacity={0.5} size={22} />

          <Text
            style={tw.style("ml-1 text-xs text-gray-500")}
            className="text-xs text-gray-500"
          >
            <Text style={tw.style("text-green-500")} className="text-green-500">
              {rating}
            </Text>{" "}
            - {genre}
          </Text>
        </View>
        <View
          style={tw.style("flex-row items-center px-2")}
          className="flex-row items-center space-x-1"
        >
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text
            style={tw.style("ml-1 text-xs text-gray-500 ")}
            className="text-xs text-gray-500"
          >
            Nearby - {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
