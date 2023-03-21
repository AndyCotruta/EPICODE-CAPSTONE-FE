import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const Breakfast = () => {
  return (
    <View style={tw.style("h-50 bg-[#FBFBFB] shadow-md rounded-3xl my-2 p-5")}>
      <Text style={tw.style("font-bold text-lg")}>Breakfast</Text>
      <Text style={tw.style("text-gray-400 text-xs")}>Dishes:</Text>
      <View
        style={tw.style("flex-row items-center justify-between  mt-5")}
      ></View>
    </View>
  );
};

export default Breakfast;
