import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../redux/reducers/restaurantSlice";

const CategoryScreen = () => {
  const {
    params: { category },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScrollView style={tw.style("bg-white")}>
      <View>
        <Image
          style={tw.style("w-full h-56 bg-gray-300 p-4")}
          source={{ uri: category.image }}
        />
        <TouchableOpacity
          style={tw.style(
            `absolute top-14 left-5 p-2 bg-[${lightBeige}] rounded-full`
          )}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftIcon size={20} color={darkGreen} />
        </TouchableOpacity>
      </View>
      <View style={tw.style(`bg-[${lightBeige}] p-4`)}>
        <Text style={tw.style(`text-3xl text-[${darkGreen}] font-bold`)}>
          {category.name}
        </Text>
        <Text
          style={tw.style("text-gray-500 mt-2 pb-4")}
          className="text-gray-500 mt-2 pb-4"
        >
          {category.short_description}
        </Text>
      </View>
      <View style={tw.style("p-4")}>
        {category.restaurants?.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={tw.style(
              `bg-[${lightBeige}] flex-row items-center rounded-xl shadow-md mb-4`
            )}
            onPress={() => {
              dispatch(
                setRestaurant({
                  id: restaurant._id,
                  imgUrl: restaurant.image,
                  title: restaurant.name,
                  rating: restaurant.rating,
                  genre: restaurant.genre,
                  address: restaurant.address,
                  short_description: restaurant.short_description,
                  dishes: restaurant.dishes,
                  lon: restaurant.lon,
                  lat: restaurant.lat,
                })
              );
              navigation.navigate("Restaurant", {
                id: restaurant._id,
                imgUrl: restaurant.image,
                title: restaurant.name,
                rating: restaurant.rating,
                genre: restaurant.genre,
                address: restaurant.address,
                short_description: restaurant.short_description,
                dishes: restaurant.dishes,
                lon: restaurant.lon,
                lat: restaurant.lat,
              });
            }}
          >
            <Image
              style={tw.style("w-30 h-30 m-4 rounded-l-xl")}
              source={{ uri: restaurant.image }}
            />
            <View style={tw.style("py-4 pr-4 flex-1")}>
              <Text style={tw.style("text-base font-bold")}>
                {restaurant.name}
              </Text>
              <View
                style={tw.style("flex-row items-center mt-2")}
                className="flex-row items-center"
              >
                <StarIcon color="green" size={22} opacity={0.5} />
                <Text
                  style={tw.style("text-xs text-gray-500")}
                  className="text-xs text-gray-500"
                >
                  <Text
                    style={tw.style("text-green-500")}
                    className="text-green-500"
                  >
                    {restaurant.rating}
                  </Text>{" "}
                  - Rating
                </Text>
              </View>
              <Text style={tw.style("font-bold mt-2")}>
                <Text style={tw.style("text-green-500")}>
                  {restaurant.dishes.length}
                </Text>{" "}
                Dishes
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;
