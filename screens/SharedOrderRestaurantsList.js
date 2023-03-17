import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import SearchComponent from "../components/SearchComponent";

const SharedOrderRestaurantsList = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw.style(`flex-1 bg-[${lightBeige}] p-4`)}>
      <View>
        <TouchableOpacity
          style={tw.style("absolute top-1 z-10")}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftIcon size={30} color={darkGreen} />
        </TouchableOpacity>

        <Text
          style={tw.style(
            `text-center text-2xl text-[${darkGreen}] font-bold mb-4`
          )}
        >
          Shared Restaurants
        </Text>
        <SearchComponent shared={true} />
      </View>
    </SafeAreaView>
  );
};

export default SharedOrderRestaurantsList;
