import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import tw from "twrnc";
import RestaurantCard from "./RestaurantCard";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";

const FeaturedRowComponent = (props) => {
  const imgUrl = "https://links.papareact.com/wru";

  return (
    <View>
      <View
        style={tw.style("mt-4  flex-row items-center justify-between px-4")}
        className="mt-4 flex-row items-center justify-between px-4"
      >
        <Text
          style={tw.style(`font-bold text-[${darkOrange}] text-lg`)}
          className="font-bold text-lg"
        >
          {props.title}
        </Text>
        <TouchableOpacity>
          <ArrowRightIcon color={darkGreen} />
        </TouchableOpacity>
      </View>
      <Text
        style={tw.style("text-xs text-gray-500 px-4")}
        className="text-xs text-gray-500 px-4"
      >
        {props.description}
      </Text>
      <ScrollView
        style={tw.style("pt-4 px-4 pb-4")}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4 px-4"
      >
        {props.restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.category}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            lon={restaurant.lon}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRowComponent;
