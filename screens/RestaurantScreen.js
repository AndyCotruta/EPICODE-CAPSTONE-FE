import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import {
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import tw from "twrnc";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../redux/reducers/restaurantSlice";
import { selectBasketItems } from "../redux/reducers/basketSlice";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";

const RestaurantScreen = () => {
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
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const items = useSelector(selectBasketItems);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView style={tw.style(`bg-[${lightBeige}]`)}>
        <View>
          <Image
            className="w-full h-56 bg-gray-300 p-4"
            style={tw.style("w-full h-56 bg-gray-300 p-4")}
            source={{ uri: imgUrl }}
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
        <View style={tw.style(`bg-[${mintGreen}]`)} className=" bg-white">
          <View style={tw.style("px-4 pt-4")} className="px-4 pt-4">
            <Text
              style={tw.style(`text-3xl text-[${darkGreen}] font-bold`)}
              className="text-3xl font-bold"
            >
              {title}
            </Text>
            <View
              style={tw.style("flex-row space-x-2 my-2")}
              className="flex-row space-x-2 my-2"
            >
              <View
                style={tw.style("flex-row items-center space-x-1")}
                className="flex-row items-center space-x-1"
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
                    {rating}
                  </Text>{" "}
                  - {genre}
                </Text>
              </View>
              <View
                style={tw.style("flex-row items-center space-x-1")}
                className="flex-row items-center space-x-1"
              >
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text
                  style={tw.style("text-xs text-gray-500")}
                  className="text-xs text-gray-500"
                >
                  Nearby - {address}
                </Text>
              </View>
            </View>
            <Text
              style={tw.style("text-gray-500 mt-2 pb-4")}
              className="text-gray-500 mt-2 pb-4"
            >
              {short_description}
            </Text>
          </View>
          <TouchableOpacity
            style={tw.style(
              "flex-row items-center space-x-2 p-4 border-y border-gray-300"
            )}
            className="flex-row items-center space-x-2 p-4 border-y border-gray-300 "
          >
            <QuestionMarkCircleIcon color={darkGreen} opacity={0.6} size={20} />
            <Text
              style={tw.style(
                `pl-2 flex-1 text-[${darkOrange}] text-md font-bold`
              )}
              className="pl-2 flex-1 text-md font-bold"
            >
              Have a food alergy?
            </Text>
            <ChevronRightIcon color={darkGreen} />
          </TouchableOpacity>
        </View>
        <View style={tw.style(`${items.length > 0 ? "pb-28" : "pb-0"}`)}>
          <Text
            style={tw.style(
              `px-4 pt-6 mb-3 text-[${darkGreen}] font-bold text-xl`
            )}
            className="px-4 pt-6 mb-3 font-bold text-xl"
          >
            Menu
          </Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
