import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

const MyPlanCard = ({ plan }) => {
  return (
    <TouchableOpacity
      style={tw.style(
        `bg-[${plan.color}] h-45 w-30 mr-4 rounded-3xl p-5 flex justify-between`
      )}
    >
      <View>{plan.icon}</View>
      <View style={tw.style("")}>
        <Text style={tw.style("font-bold")}>{plan.title}</Text>
        <Text style={tw.style("text-gray-400")}>{plan.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyPlanCard;
