import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../redux/reducers/restaurantSlice";
import {
  addRestautantId,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../redux/reducers/basketSlice";
import tw from "twrnc";
import { XCircleIcon } from "react-native-heroicons/solid";
import { darkGreen, darkOrange, lightBeige } from "../graphics/colours";

const BasketScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <View style={tw.style("flex-1 bg-white")}>
      <View style={tw.style(`p-5  bg-[${lightBeige}] shadow-sm`)}>
        <View
          style={tw.style(`${Platform.OS === "android" ? "pt-12" : "pt-2"}`)}
        >
          <Text style={tw.style("text-3xl font-bold text-center")}>Basket</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Restaurant", {
                id: restaurant.id,
                imgUrl: restaurant.imgUrl,
                title: restaurant.title,
                rating: restaurant.rating,
                genre: restaurant.genre,
                address: restaurant.address,
                short_description: restaurant.short_description,
                dishes: restaurant.dishes,
                long: restaurant.lat,
                lat: restaurant.lat,
              });
            }}
          >
            <Text style={tw.style("text-center text-gray-400")}>
              {restaurant.title}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tw.style(
            `rounded-full  absolute ${
              Platform.OS === "android" ? "top-8 right-2" : "top-2 right-2"
            } `
          )}
        >
          <XCircleIcon color={darkGreen} size={50} />
        </TouchableOpacity>
      </View>
      <View style={tw.style(`flex-1 bg-white px-4`)}>
        <View
          style={tw.style(
            `flex-row items-center px-4 py-3 bg-[${lightBeige}] my-5 rounded-xl`
          )}
        >
          <Image
            style={tw.style("h-7 w-7 bg-gray-300 p-4 rounded-full mr-3")}
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />
          <Text style={tw.style("flex-1")}>Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text style={tw.style(`text-[${darkOrange}] font-bold`)}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              style={tw.style(
                `flex flex-row items-center bg-[${lightBeige}] p-4 mb-4 rounded-xl`
              )}
              key={key}
            >
              <Text style={tw.style(`font-bold text-lg text-[${darkGreen}]`)}>
                {items.length}{" "}
              </Text>
              <Text>x</Text>
              <Image
                source={{ uri: items[0]?.image }}
                style={tw.style("h-12 w-12 rounded-full mx-2")}
              />
              <View style={tw.style("flex-1")}>
                <Text style={tw.style("")}>{items[0]?.name}</Text>
                <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
                  ${items[0]?.price}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (items.length <= 1) {
                    dispatch(removeFromBasket({ id: key }));
                    dispatch(addRestautantId(null));
                  } else {
                    dispatch(removeFromBasket({ id: key }));
                  }
                }}
              >
                <Text
                  style={tw.style(
                    `text-[${darkOrange}] ml-3 text-sm font-bold`
                  )}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BasketScreen;
