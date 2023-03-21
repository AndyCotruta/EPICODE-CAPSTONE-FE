import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const MyPlanCard = ({ plan, active, setActive }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw.style(
        `bg-[${plan.color}] h-45 w-30 mr-4 rounded-3xl p-5 flex justify-between`
      )}
      onPress={() => {
        if (plan.title === "Food") {
          setActive(plan.title);
        }
      }}
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
