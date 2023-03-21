import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { EllipsisVerticalIcon } from "react-native-heroicons/outline";

const DashboardActivityCard = ({ activity }) => {
  return (
    <TouchableOpacity
      style={tw.style(
        "h-45 w-75 bg-[#FFECE5] p-2 mr-4 rounded-2xl flex-row justify-between items-center"
      )}
    >
      <Image style={tw.style("h-30 w-30 mr-2")} source={activity.image} />
      <View style={tw.style("flex-1")}>
        <Text
          style={tw.style(
            "bg-white w-20 text-center text-xs text-red-500 font-bold p-1 rounded-2xl"
          )}
        >
          {activity.label.toUpperCase()}
        </Text>

        <Text style={tw.style("text-xl font-bold")}>{activity.title}</Text>
        <Text style={tw.style("text-xs text-gray-400")}>
          Starting Date: 12 Apr
        </Text>
      </View>
      <TouchableOpacity style={tw.style("self-start mt-1")}>
        <EllipsisVerticalIcon size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DashboardActivityCard;
