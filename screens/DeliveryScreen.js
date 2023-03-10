import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/reducers/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <SafeAreaView style={tw.style(`bg-[${lightBeige}] flex-1 p-4`)}>
      <View style={tw.style("flex-row justify-between items-center z-50")}>
        <TouchableOpacity
          style={tw.style(
            `bg-[${darkGreen}] w-8 h-8 rounded-full flex items-center justify-center`
          )}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>

        <Text style={tw.style(`font-bold text-2xl text-[${darkGreen}]`)}>
          Help?
        </Text>
      </View>
      <View
        style={tw.style(
          "bg-white rounded-xl p-4 my-4 shadow-md flex-row justify-between"
        )}
      >
        <View>
          <Text style={tw.style("text-sm text-gray-400 mb-2")}>
            Estimated Delivery Time
          </Text>
          <Text style={tw.style("text-3xl font-bold")}>45-55 Minutes</Text>
        </View>
        <Image
          style={tw.style("w-20 h-20")}
          source={require("../assets/orderComing.gif")}
        />
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
