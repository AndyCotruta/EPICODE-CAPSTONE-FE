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
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../redux/reducers/basketSlice";
import tw from "twrnc";
import { XCircleIcon } from "react-native-heroicons/solid";

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
      <View style={tw.style("flex-1 bg-gray-100")}>
        <View
          style={tw.style("p-5 border-b border-[#00CCBB] bg-white shadow-xs")}
        >
          <View
            style={tw.style(`${Platform.OS === "android" ? "pt-12" : "pt-2"}`)}
          >
            <Text style={tw.style("text-lg font-bold text-center")}>
              Basket
            </Text>
            <Text style={tw.style("text-center text-gray-400")}>
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw.style(
              `rounded-full  absolute ${
                Platform.OS === "android" ? "top-8 right-2" : "top-2 right-2"
              } `
            )}
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>
        <View style={tw.style("flex-row items-center px-4 py-3 bg-white my-5")}>
          <Image
            style={tw.style("h-7 w-7 bg-gray-300 p-4 rounded-full mr-3")}
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />
          <Text style={tw.style("flex-1")}>Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text style={tw.style("text-[#00CCBB]")}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key}>
              <Text>{items.length} x</Text>
              <Image
                source={{ uri: items[0]?.image }}
                style={tw.style("h-12 w-12 rounded-full")}
              />
              <Text style={tw.style("flex-1")}>{items[0]?.name}</Text>
              <Text>${items[0]?.price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text style={tw.style("text-[#00CCBB] text-xs")}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BasketScreen;
