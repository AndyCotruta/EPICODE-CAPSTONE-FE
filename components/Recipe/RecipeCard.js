import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { brightOrange, lightBeige } from "../../graphics/colours";
import { ClockIcon, FaceSmileIcon } from "react-native-heroicons/outline";

const RecipeCard = ({ active, recipe }) => {
  return (
    <View
      style={tw.style(
        `bg-[${brightOrange}] h-75 w-50 mr-4 mt-4 rounded-3xl p-3 overflow-hidden`
      )}
    >
      <View
        style={tw.style(
          `h-45 w-45 bg-[${lightBeige}] flex-1 border-8 border-white rounded-full absolute top-5 -right-10 flex items-center justify-center`
        )}
      >
        <Image
          style={tw.style("h-full w-full rounded-full ")}
          source={{ uri: recipe.image }}
        />
      </View>
      <View style={tw.style("h-47 w-45")}></View>
      <View style={tw.style("flex-1 justify-between")}>
        <Text style={tw.style("font-bold text-base h-15 overflow-hidden")}>
          {recipe.title}
        </Text>
        <View style={tw.style("flex-row justify-between mt-2")}>
          <View style={tw.style("flex-row items-center")}>
            <ClockIcon size={20} color="gray" />
            <Text style={tw.style("text-gray-500 ml-1")}>20 min</Text>
          </View>
          <View style={tw.style("flex-row items-center")}>
            <FaceSmileIcon size={20} color="gray" />
            <Text style={tw.style("text-gray-500 ml-1")}>Easy</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeCard;
